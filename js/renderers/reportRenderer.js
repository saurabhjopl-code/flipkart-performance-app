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



/* ===================================================
   MONTH REPORT (M-O-M CONSOLIDATION SHEET)
=================================================== */

export function renderGmvMonthReport(data, targetId) {

    const container = document.getElementById(targetId);
    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = "<p>No Monthly GMV data available.</p>";
        return;
    }

    let html = `
        <div class="table-wrapper">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Gross Units</th>
                        <th>GMV</th>
                        <th>Cancel Units</th>
                        <th>Return Units</th>
                        <th>Final Units</th>
                        <th>Final Revenue</th>
                        <th>Cancel %</th>
                        <th>Return %</th>
                        <th>Net Realisation %</th>
                    </tr>
                </thead>
                <tbody>
    `;

    data.forEach(row => {
        html += `
            <tr>
                <td>${row["Month"]}</td>
                <td>${row["Gross Units"]}</td>
                <td>${row["GMV"]}</td>
                <td>${row["Cancel Units"]}</td>
                <td>${row["Return Units"]}</td>
                <td>${row["Final Units"]}</td>
                <td>${row["Final Revenue"]}</td>
                <td>${row["Cancel %"]}</td>
                <td>${row["Return %"]}</td>
                <td>${row["Net Realisation %"]}</td>
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
