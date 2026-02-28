export function renderGmvDailyReport(data) {

    const container = document.getElementById("gmvReports");

    if (!container) return; // safety guard

    if (!data || data.length === 0) {
        container.innerHTML = "<p>No GMV data available for selected period.</p>";
        return;
    }

    let html = `
        <h2>GMV Daily Report</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Gross Units</th>
                    <th>GMV</th>
                    <th>Cancelled Units</th>
                    <th>Returned Units</th>
                    <th>Final Units</th>
                    <th>Final Revenue</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(row => {
        html += `
            <tr>
                <td>${row.date}</td>
                <td>${row.grossUnits}</td>
                <td>${row.gmv}</td>
                <td>${row.cancelUnits}</td>
                <td>${row.returnUnits}</td>
                <td>${row.finalUnits}</td>
                <td>${row.finalRevenue}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}
