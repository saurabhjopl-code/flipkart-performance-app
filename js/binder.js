import { setView } from "./core/stateManager.js";
import { renderNavigation } from "./renderers/navigationRenderer.js";
import { startProgress, finishProgress } from "./engines/progress/progressEngine.js";

import { renderExecutiveSummary } from "./renderers/summaryRenderer.js";
import { renderLineChart } from "./renderers/chartRenderer.js";

import { calculateGmvSummary } from "./engines/summary/gmvSummaryBoxes.js";
import { calculateAdsSummary } from "./engines/summary/adsSummaryBoxes.js";
import { calculateTrafficSummary } from "./engines/summary/trafficSummaryBoxes.js";

import { prepareGmvChartData } from "./engines/summary/gmvSummaryChart.js";
import { prepareAdsChartData } from "./engines/summary/adsSummaryChart.js";
import { prepareTrafficChartData } from "./engines/summary/trafficSummaryChart.js";

import { getGmvDailyReport } from "./engines/reports/gmvDailyReport.js";
import { renderGmvDailyReport } from "./renderers/reportRenderer.js";


/* ===============================
   SUMMARY RENDER
================================ */

function renderSummary() {

    const gmvData = calculateGmvSummary();
    const adsData = calculateAdsSummary();
    const trafficData = calculateTrafficSummary();

    renderExecutiveSummary(gmvData, adsData, trafficData);

    renderLineChart("gmvChart", prepareGmvChartData());
    renderLineChart("adsChart", prepareAdsChartData());
    renderLineChart("trafficChart", prepareTrafficChartData());
}


/* ===============================
   GMV RENDER
================================ */

function renderGmv() {

    const container = document.getElementById("gmvReports");
    if (!container) return;

    container.innerHTML = `
        <div class="report-tabs">
            <button class="report-tab active" data-tab="daily">Daily</button>
            <button class="report-tab" data-tab="month">Month</button>
            <button class="report-tab" data-tab="sku">SKU</button>
        </div>
        <div id="gmvReportContent"></div>
    `;

    const content = document.getElementById("gmvReportContent");

    // Default Daily
    const dailyData = getGmvDailyReport();
    renderGmvDailyReport(dailyData, "gmvReportContent");

    const tabs = container.querySelectorAll(".report-tab");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const type = tab.dataset.tab;

            if (type === "daily") {
                const data = getGmvDailyReport();
                renderGmvDailyReport(data, "gmvReportContent");
            }

            if (type === "month") {
                content.innerHTML = "<p>Month report coming next.</p>";
            }

            if (type === "sku") {
                content.innerHTML = "<p>SKU report coming next.</p>";
            }
        });
    });
}


/* ===============================
   INIT BINDER
================================ */

export function initBinder() {

    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const view = button.dataset.view;

            startProgress();

            setTimeout(() => {

                setView(view);
                renderNavigation(view);

                if (view === "summary") renderSummary();
                if (view === "gmv") renderGmv();

                finishProgress();

            }, 200);
        });

    });

    /* ===============================
       AUTO LOAD DEFAULT VIEW
    ================================= */

    document.addEventListener("dataReady", () => {

        setView("summary");
        renderNavigation("summary");
        renderSummary();

    });
}
