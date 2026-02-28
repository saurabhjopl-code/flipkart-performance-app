import { DATA_SOURCES } from "../../config/dataSources.js";

let cachedMonthData = null;

async function loadMonthData() {

    if (cachedMonthData) return cachedMonthData;

    const response = await fetch(DATA_SOURCES.GMV_MONTH);
    const csvText = await response.text();

    const rows = csvText.split("\n").map(r => r.split(","));

    const headers = rows[0].map(h => h.trim());

    const data = rows.slice(1)
        .filter(r => r.length === headers.length)
        .map(row => {
            const obj = {};
            headers.forEach((h, i) => obj[h] = row[i]);
            return obj;
        });

    cachedMonthData = data;
    return data;
}

export async function getGmvMonthReport() {
    return await loadMonthData();
}
