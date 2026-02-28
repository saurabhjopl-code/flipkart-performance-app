export function renderGmvSummaryBoxes(data) {

    const container = document.getElementById("summaryWrapper");

    container.innerHTML = `
        <div class="summary-section-title">
            GMV Performance Summary
        </div>

        <div class="summary-cards-row">
            <div class="summary-card">
                <h3>Gross Units Sold</h3>
                <h2>${data.grossUnits}</h2>
            </div>

            <div class="summary-card">
                <h3>Gross Merchandise Value (GMV)</h3>
                <h2>₹ ${data.gmv}</h2>
            </div>

            <div class="summary-card">
                <h3>Cancelled Units (${data.cancelPercent}%)</h3>
                <h2>${data.cancelUnits}</h2>
            </div>

            <div class="summary-card">
                <h3>Returned Units (${data.returnPercent}%)</h3>
                <h2>${data.returnUnits}</h2>
            </div>

            <div class="summary-card">
                <h3>Final Units Delivered</h3>
                <h2>${data.finalUnits}</h2>
            </div>

            <div class="summary-card">
                <h3>Net Revenue Realised</h3>
                <h2>₹ ${data.finalRevenue}</h2>
            </div>
        </div>
    `;
}
