export function renderGmvDailyReport(data, targetId) {

    const container = document.getElementById(targetId);
    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = "<p>No GMV data available for selected period.</p>";
        return;
    }

    let html = `
        <div class="table-wrapper">
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
        </div>
    `;

    container.innerHTML = html;
}
