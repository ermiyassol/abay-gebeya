function changeDateToUTC(dateString: string[], dateOnly = false) {
    const startDate = new Date(dateString[0]).toISOString().replace("Z", "");
    const endDate = new Date(dateString[1]).toISOString().replace("Z", "");

    return dateOnly ? {startDate: startDate.split("T")[0], endDate: endDate.split("T")[0]} : {startDate: startDate, endDate: endDate};
}

export default changeDateToUTC;