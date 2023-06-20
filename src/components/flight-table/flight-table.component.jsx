import { Fragment } from 'react';
import styles from './flight-table.module.css'
import formatDate from '../../modules/format-date';

const FlightTable = ({banner, headings, data}) => {
    var flightDate = "";
    var rowCount = 1;

    function StatusCheck(key, dataObject) {
        //Checks the status of the flight and changes a the cell style accordingly
        if (key === "status") {
            if (dataObject.status === "Early") {
                return styles.early
            }
            if (dataObject.status === "Cancelled") {
                return styles.late;
            }
            if (dataObject.status === "Late" || dataObject.status === "Delayed") {
                return styles.delayed
            }
            return null
        }
    }
    return (
        <div className={styles.tableContainer}>
            <img className={styles.logo} src={banner} alt=""/>
            <table>
                <tbody>
                    <tr>
                        {headings.map((heading, index) => {
                            return (
                                <th key={index} className={styles.headerRow}>{heading}</th> 
                                );
                            })}
                    </tr>
                    {data.map((dataObject, index) => {
                        var rowClass = styles.oddRow
                        if (rowCount % 2 === 0) {
                            rowClass = styles.evenRow;
                        }
                        if (dataObject.flightDate !== flightDate) {
                            const formattedDate = formatDate(dataObject.flightDate)
                            const dateRowClass = rowClass;
                            rowCount++ 
                            if (rowCount % 2 === 0) {
                                rowClass = styles.evenRow;
                            } else {
                                rowClass =styles.oddRow;
                            }
                            flightDate = dataObject.flightDate
                            rowCount++
                            return(
                                <Fragment key={index}>
                                    <tr className={dateRowClass} ><td className={styles.dateCell} colSpan={Object.keys(dataObject).length - 1}>{formattedDate}</td></tr>
                                    <tr className={rowClass} key={index}>
                                        {Object.keys(dataObject).map((key, index) => {
                                            if (key === "flightDate") {
                                                return null;
                                            }
                                            const statusEdit = StatusCheck(key, dataObject);
                                            return (
                                                <td className={statusEdit} key={index}>{dataObject[key]} </td>
                                            );
                                        })}
                                    </tr>
                                </Fragment>
                            )
                        }
                        rowCount++
                        return (
                            <tr className={rowClass} key={index}>
                                {Object.keys(dataObject).map((key, index) => {
                                    if (key === "flightDate") {
                                        return null;
                                    }
                                    const statusEdit = StatusCheck(key, dataObject);
                                    return (
                                        <td className={statusEdit} key={index}>{dataObject[key]} </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default FlightTable;