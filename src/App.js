import { useEffect, useState } from 'react';
import './App.css';
import FlightTable from './components/flight-table/flight-table.component';
import Footer from './components/footer/footer-component';
import { httpGetFlightData } from './hooks/requests';
import To12HourTime from './modules/time-converter';
import ConvertToCity from './modules/aita-code-conversion';
import FormatOnTime from './modules/format-ontime';

const arrHeadings = ["Airline", "Flight", "Arriving From", "Weather", "Scheduled", "Actual", "Gate","Status"]
const depHeadings = ["Airline", "Flight", "Destination", "Weather", "Scheduled", "Actual", "Gate", "Status"]

function App() {
  const [arrFlightData, setArrFlightData] = useState([])
  const [depFlightData, setDepFlightData] = useState([])
  const [updateCount, setUpdateCount] = useState(1)
  const [lastUpdated, setLastUpdated] = useState("Loading Data")
  const [dataError, setDataError] = useState(false)

  const getFlights = async () => {
    try {
      const flights = await httpGetFlightData();
      const arrFinalFlights = [];
      const depFinalFlights = [];
      var count = 1

      await flights[0].Flights.map((flight) => {
        if (count === 60) {
          return null;
        }
        if (flight.Status === "Arrived" || flight.Status === "Departed") {
          return null;
        }
        if (flight.ArrDep === "A") {
          const filteredFlight = {
            airline: <img className='flightImg' src={`assets/carriers/${flight.CC}.png`} alt={flight.CC} />,
            flightNumber: flight.MasterFlight.replace(/\D/g, ''),
            from: ConvertToCity(flight.ActualCities),
            weather: "Weather",
            scheduledTime: To12HourTime(flight.SchedTime),
            arrTime: To12HourTime(flight.EstTime),
            gate: flight.ActualGate,
            status: FormatOnTime(flight.Status),
            flightDate: flight.FlightDate.slice(0, 10),
          }
          arrFinalFlights.push(filteredFlight);
        } else {
          const filteredFlight = {
            airline: <img className='flightImg' src={`assets/carriers/${flight.CC}.png`} alt={flight.CC} />,
            flightNumber: flight.MasterFlight.replace(/\D/g, ''),
            from: ConvertToCity(flight.ActualCities),
            weather: "Weather",
            scheduledTime: To12HourTime(flight.SchedTime),
            depTime: To12HourTime(flight.EstTime),
            gate: flight.ActualGate,
            status: FormatOnTime(flight.Status),
            flightDate: flight.FlightDate.slice(0, 10)
          }
          depFinalFlights.push(filteredFlight);
        }
        count++;
        return null;
      })
      setArrFlightData(arrFinalFlights);
      setDepFlightData(depFinalFlights);
      setLastUpdated(Date().slice(16, 21))
    } catch (error) {
      setDataError(true);
    }
  }
  

  useEffect(() => {
    getFlights();
  }, []) 

  useEffect(() => {
    setTimeout(() =>
    {
      getFlights()
      console.log(Date().slice(16, 21))
      setUpdateCount(updateCount + 1)
    }, 600000)
  }, [updateCount])

  return (
    <div className="App">
      <div>
        <h1>
          Last Updated: {lastUpdated}
        </h1>
        {dataError && <h1> Error Retrieving Data.</h1>}
        {arrFlightData.length > 0 && 
        <div>
          <FlightTable banner="assets/ARR-Header.png" headings={arrHeadings} data={arrFlightData}/>
          <FlightTable banner="assets/DEP-Header.png" headings={depHeadings} data={depFlightData} />
        </div>
        }
      </div>
      <Footer/>
    </div>
  );
}

export default App;
