export function renderGmvDailyReport(data) {

    const container = document.getElementById("reportWrapper");

    container.innerHTML = `
        <div class="report-title">GMV Daily Sales Report</div>
        <div class="report-table-wrapper">
            <table class="report-table">
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Gross Units</th>
                        <th>GMV</th>
                        <th>Cancel Units</th>
                        <th>Return Units</th>
                        <th>Final Units</th>
                        <th>Final Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            <td>${row.date}</td>
                            <td>${row.grossUnits}</td>
                            <td>₹ ${row.gmv}</td>
                            <td>${row.cancelUnits}</td>
                            <td>${row.returnUnits}</td>
                            <td>${row.finalUnits}</td>
                            <td>₹ ${row.finalRevenue}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}
