import { getState } from "../../core/stateManager.js";

export function calculateAdsSummary() {

    const state = getState();
    const data = state.filteredData.ADS_DATE || [];

    let adSpend = 0;
    let convertedUnits = 0;
    let revenue = 0;

    data.forEach(row => {
        adSpend += Number(row["Ad Spend"] || 0);
        convertedUnits += Number(row["Converted Units"] || 0);
        revenue += Number(row["Revenue"] || 0);
    });

    const roi = adSpend ? revenue / adSpend : 0;

    return {
        adSpend: adSpend.toFixed(2),
        convertedUnits,
        revenue: revenue.toFixed(2),
        roi: roi.toFixed(2)
    };
}
