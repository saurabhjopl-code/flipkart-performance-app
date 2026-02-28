import { getState } from "../../core/stateManager.js";

export function prepareGmvChartData() {

    const state = getState();
    const data = state.filteredData.GMV_DATE || [];

    const labels = [];
    const gross = [];
    const cancel = [];
    const returns = [];
    const netRevenue = [];

    data.forEach(row => {
        labels.push(row["Order Date"]);
        gross.push(Number(row["GMV"] || 0));
        cancel.push(Number(row["Cancel Units"] || 0));
        returns.push(Number(row["Return Units"] || 0));
        netRevenue.push(Number(row["Final Revenue"] || 0));
    });

    return {
        labels,
        datasets: [
            { label: "GMV", data: gross, borderColor: "#2874f0" },
            { label: "Cancel Units", data: cancel, borderColor: "#ff4d4f" },
            { label: "Return Units", data: returns, borderColor: "#faad14" },
            { label: "Net Revenue", data: netRevenue, borderColor: "#52c41a" }
        ]
    };
}
