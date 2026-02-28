let currentChart = null;

export function renderLineChart(canvasId, chartData) {

    const container = document.getElementById("summaryCharts");
    container.innerHTML = `<canvas id="${canvasId}"></canvas>`;

    const ctx = document.getElementById(canvasId).getContext("2d");

    if (currentChart) {
        currentChart.destroy();
    }

    currentChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
