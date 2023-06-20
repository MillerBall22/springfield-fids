function formatDate(date) {
    const year = date.slice(0, 4)
    const month = date.slice(5,7)
    const day = date.slice(8)
    var monthText =""

    switch (month) {
        case "01":
            monthText = "January";
            break;
        case "02":
            monthText = "Febuary";
            break;
        case "03":
            monthText = "March";
            break;
        case "04":
            monthText = "April";
            break;
        case "05":
            monthText = "May";
            break;
        case "06":
            monthText = "June";
            break;
        case "07":
            monthText = "July";
            break;
        case "08":
            monthText = "August";
            break;
        case "09":
            monthText = "September";
            break;
        case "10":
            monthText = "October";
            break;
        case "11":
            monthText = "November";
            break;
        case "12":
            monthText = "December";
            break;
        default:
            break;
    }

    const formattedDate = `${monthText} ${day}, ${year}`
    return formattedDate;
}

export default formatDate;