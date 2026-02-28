export function parseDate(dateString) {
    if (!dateString) return null;

    const parts = dateString.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
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

export function getLatestMonth(data, monthField) {
    const months = data.map(row => parseDate(row[monthField])).filter(Boolean);
    return new Date(Math.max(...months));
}
