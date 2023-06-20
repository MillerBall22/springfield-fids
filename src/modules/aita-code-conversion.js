import { codes } from "../data/airports"

function ConvertToCity(iataCode) {
    return codes[iataCode];
}

export default ConvertToCity