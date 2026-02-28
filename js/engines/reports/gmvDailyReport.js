import { getState } from "../../core/stateManager.js";

export function getGmvDailyReport() {

    const state = getState();

    const gmvKey = Object.keys(state.filteredData).find(key => {
        const dataset = state.filteredData[key];
        if (!dataset?.length) return false;
        const columns = Object.keys(dataset[0]);
        return columns.includes("Gross Units") && columns.includes("Final Revenue");
    });

    const data = gmvKey ? state.filteredData[gmvKey] : [];

    const formatted = data.map(row => ({
        date: row["Order Date"],
        grossUnits: Number(row["Gross Units"] || 0),
        gmv: Number(row["GMV"] || 0),
        cancelUnits: Number(row["Cancel Units"] || 0),
        returnUnits: Number(row["Return Units"] || 0),
        finalUnits: Number(row["Final Units"] || 0),
        finalRevenue: Number(row["Final Revenue"] || 0)
    }));

    // Sort by Gross Units descending
    formatted.sort((a, b) => b.grossUnits - a.grossUnits);

    return formatted;
}
