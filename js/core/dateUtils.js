export function parseDate(dateString) {
    if (!dateString) return null;

    // Support both dd/mm/yyyy and dd-mm-yyyy
    const separator = dateString.includes("/") ? "/" : "-";
    const parts = dateString.split(separator);

    if (parts.length !== 3) return null;

    const day = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const year = Number(parts[2]);

    return new Date(year, month, day);
}

export function filterByDateRange(data, startDate, endDate, dateField) {
    if (!startDate && !endDate) return data;

    return data.filter(row => {
        const rowDate = parseDate(row[dateField]);
        if (!rowDate) return false;

        if (startDate && rowDate < startDate) return false;
        if (endDate && rowDate > endDate) return false;

        return true;
    });
}
