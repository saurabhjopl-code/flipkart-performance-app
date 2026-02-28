let currentChart = null;

export function renderLineChart(canvasId, chartData) {

    const container = document.getElementById("summaryCharts");

    container.innerHTML = `
        <div style="width:100%; height:400px;">
            <canvas id="${canvasId}"></canvas>
        </div>
    `;

    const ctx = document.getElementById(canvasId).getContext("2d");

    if (currentChart) {
        currentChart.destroy();
    }

    currentChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: chartData.datasets.map(ds => ({
                label: ds.label,
                data: ds.data,
                borderColor: ds.borderColor,
                borderWidth: 2,
                tension: 0.3,
                fill: false
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top"
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
