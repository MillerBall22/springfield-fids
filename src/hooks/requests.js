const API_URL = 'http://192.168.0.62/php/fidsapi/';

// get submissions
async function httpGetFlightData() {
  try {
    const response = await fetch(`${API_URL}export.tsi`);
    return await response.json();
  } catch (error) {
    console.log(error)
    return {error}
  }
}

export {
  httpGetFlightData,
}