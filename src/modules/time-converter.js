function To12HourTime(time) {
    const hour = +time.slice(11, 13);
    var convertedHour = hour % 12;
    if (convertedHour === 0) {
        convertedHour = 12;
    }
    const newTime = convertedHour + time.slice(13, 16);
    if (hour >= 12) {
        return newTime + " PM";
    } else {
        return newTime + " AM";
    }
}

export default To12HourTime;