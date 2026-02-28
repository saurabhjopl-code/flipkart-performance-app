export function renderGmvSummaryBoxes(data) {

    const container = document.getElementById("summaryWrapper");

    container.innerHTML = `
        <div class="summary-card">
            <h3>Gross Units</h3>
            <h2>${data.grossUnits}</h2>
        </div>
        <div class="summary-card">
            <h3>GMV</h3>
            <h2>₹ ${data.gmv}</h2>
        </div>
        <div class="summary-card">
            <h3>Cancel Units (${data.cancelPercent}%)</h3>
            <h2>${data.cancelUnits}</h2>
        </div>
        <div class="summary-card">
            <h3>Return Units (${data.returnPercent}%)</h3>
            <h2>${data.returnUnits}</h2>
        </div>
        <div class="summary-card">
            <h3>Final Units</h3>
            <h2>${data.finalUnits}</h2>
        </div>
        <div class="summary-card">
            <h3>Final Revenue</h3>
            <h2>₹ ${data.finalRevenue}</h2>
        </div>
    `;
}
