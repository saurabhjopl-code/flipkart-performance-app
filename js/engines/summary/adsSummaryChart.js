import { getState } from "../../core/stateManager.js";

export function prepareAdsChartData() {

    const state = getState();
    const data = state.filteredData.ADS_DATE || [];

    const labels = [];
    const spend = [];
    const revenue = [];
    const units = [];

    data.forEach(row => {
        labels.push(row["Date"]);
        spend.push(Number(row["Ad Spend"] || 0));
        revenue.push(Number(row["Revenue"] || 0));
        units.push(Number(row["Converted Units"] || 0));
    });

    return {
        labels,
        datasets: [
            { label: "Ad Spend", data: spend, borderColor: "#722ed1" },
            { label: "Revenue", data: revenue, borderColor: "#13c2c2" },
            { label: "Converted Units", data: units, borderColor: "#fa8c16" }
        ]
    };
}
