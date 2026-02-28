export function renderExecutiveSummary(gmvData, adsData){

    const container=document.getElementById("summaryWrapper");

    container.innerHTML=`

        <div class="summary-section">
            <div class="summary-section-title">
                GMV Performance Summary
            </div>

            <div class="summary-cards-row">
                <div class="summary-card">
                    <h3>Gross Units Sold</h3>
                    <h2>${gmvData.grossUnits}</h2>
                </div>
                <div class="summary-card">
                    <h3>Gross Merchandise Value</h3>
                    <h2>₹ ${gmvData.gmv}</h2>
                </div>
                <div class="summary-card">
                    <h3>Cancelled Units (${gmvData.cancelPercent}%)</h3>
                    <h2>${gmvData.cancelUnits}</h2>
                </div>
                <div class="summary-card">
                    <h3>Returned Units (${gmvData.returnPercent}%)</h3>
                    <h2>${gmvData.returnUnits}</h2>
                </div>
                <div class="summary-card">
                    <h3>Final Units Delivered</h3>
                    <h2>${gmvData.finalUnits}</h2>
                </div>
                <div class="summary-card">
                    <h3>Net Revenue</h3>
                    <h2>₹ ${gmvData.finalRevenue}</h2>
                </div>
            </div>

            <div class="chart-container">
                <canvas id="gmvChart"></canvas>
            </div>
        </div>

        <div class="summary-section">
            <div class="summary-section-title">
                Ads Performance Summary
            </div>

            <div class="summary-cards-row">
                <div class="summary-card">
                    <h3>Ad Spend</h3>
                    <h2>₹ ${adsData.adSpend}</h2>
                </div>
                <div class="summary-card">
                    <h3>Converted Units</h3>
                    <h2>${adsData.convertedUnits}</h2>
                </div>
                <div class="summary-card">
                    <h3>Revenue</h3>
                    <h2>₹ ${adsData.revenue}</h2>
                </div>
                <div class="summary-card">
                    <h3>ROI</h3>
                    <h2>${adsData.roi}</h2>
                </div>
            </div>

            <div class="chart-container">
                <canvas id="adsChart"></canvas>
            </div>
        </div>
    `;
}
