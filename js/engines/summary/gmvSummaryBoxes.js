import { getState } from "../../core/stateManager.js";

export function calculateGmvSummary() {

    const state = getState();
    const data = state.filteredData.GMV_DATE || [];

    let grossUnits = 0;
    let gmv = 0;
    let cancelUnits = 0;
    let returnUnits = 0;
    let finalUnits = 0;
    let finalRevenue = 0;

    data.forEach(row => {
        grossUnits += Number(row["Gross Units"] || 0);
        gmv += Number(row["GMV"] || 0);
        cancelUnits += Number(row["Cancel Units"] || 0);
        returnUnits += Number(row["Return Units"] || 0);
        finalUnits += Number(row["Final Units"] || 0);
        finalRevenue += Number(row["Final Revenue"] || 0);
    });

    const cancelPercent = grossUnits ? ((cancelUnits / grossUnits) * 100).toFixed(2) : 0;
    const returnPercent = grossUnits ? ((returnUnits / grossUnits) * 100).toFixed(2) : 0;

    return {
        grossUnits,
        gmv,
        cancelUnits,
        returnUnits,
        finalUnits,
        finalRevenue,
        cancelPercent,
        returnPercent
    };
}
