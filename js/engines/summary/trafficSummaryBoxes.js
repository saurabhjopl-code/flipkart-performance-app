import { getState } from "../../core/stateManager.js";

export function calculateTrafficSummary() {

    const state = getState();

    const trafficKey = Object.keys(state.filteredData).find(key => {
        const dataset = state.filteredData[key];
        if (!dataset?.length) return false;
        const columns = Object.keys(dataset[0]);
        return columns.includes("Product Views") && columns.includes("Product Clicks");
    });

    const data = trafficKey ? state.filteredData[trafficKey] : [];

    let views = 0;
    let clicks = 0;
    let sales = 0;
    let ctrTotal = 0;
    let cvrTotal = 0;
    let rowCount = 0;

    data.forEach(row => {
        views += Number(row["Product Views"] || 0);
        clicks += Number(row["Product Clicks"] || 0);
        sales += Number(row["Sales"] || 0);
        ctrTotal += Number(row["CTR"] || 0);
        cvrTotal += Number(row["Conversion Rate"] || 0);
        rowCount++;
    });

    const avgCTR = rowCount ? ((ctrTotal / rowCount) * 100).toFixed(2) : 0;
    const avgCVR = rowCount ? ((cvrTotal / rowCount) * 100).toFixed(2) : 0;

    return {
        views,
        clicks,
        sales,
        avgCTR,
        avgCVR
    };
}
