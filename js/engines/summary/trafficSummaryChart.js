import { getState } from "../../core/stateManager.js";

export function prepareTrafficChartData() {

    const state = getState();
    const data = state.filteredData.TRAFFIC_DATE || [];

    const labels = [];
    const views = [];
    const clicks = [];
    const sales = [];

    data.forEach(row => {
        labels.push(row["Date"]);
        views.push(Number(row["Product Views"] || 0));
        clicks.push(Number(row["Product Clicks"] || 0));
        sales.push(Number(row["Sales"] || 0));
    });

    return {
        labels,
        datasets: [
            { label: "Views", data: views, borderColor: "#1890ff" },
            { label: "Clicks", data: clicks, borderColor: "#faad14" },
            { label: "Sales", data: sales, borderColor: "#52c41a" }
        ]
    };
}
