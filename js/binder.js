import { setView, getState } from "./core/stateManager.js";
import { renderNavigation } from "./renderers/navigationRenderer.js";
import { startProgress, finishProgress } from "./engines/progress/progressEngine.js";

import { calculateGmvSummary } from "./engines/summary/gmvSummaryBoxes.js";
import { calculateAdsSummary } from "./engines/summary/adsSummaryBoxes.js";
import { calculateTrafficSummary } from "./engines/summary/trafficSummaryBoxes.js";

import { prepareGmvChartData } from "./engines/summary/gmvSummaryChart.js";
import { prepareAdsChartData } from "./engines/summary/adsSummaryChart.js";
import { prepareTrafficChartData } from "./engines/summary/trafficSummaryChart.js";

import { renderExecutiveSummary } from "./renderers/summaryRenderer.js";
import { renderLineChart } from "./renderers/chartRenderer.js";

import { getGmvDailyReport } from "./engines/reports/gmvDailyReport.js";
import { renderGmvDailyReport } from "./renderers/reportRenderer.js";

/* ===========================
   VIEW SWITCHING
=========================== */

function switchView(view) {
    const views = document.querySelectorAll(".view-section");
    views.forEach(section => section.classList.remove("active-view"));

    const activeSection = document.getElementById(`${view}View`);
    if (activeSection) {
        activeSection.classList.add("active-view");
    }
}

/* ===========================
   SUMMARY
=========================== */

function renderSummary() {

    switchView("summary");

    const gmvData = calculateGmvSummary();
    const adsData = calculateAdsSummary();
    const trafficData = calculateTrafficSummary();

    renderExecutiveSummary(gmvData, adsData, trafficData);

    renderLineChart("gmvChart", prepareGmvChartData());
    renderLineChart("adsChart", prepareAdsChartData());
    renderLineChart("trafficChart", prepareTrafficChartData());
}

/* ===========================
   GMV WITH INTERNAL TABS
=========================== */

function renderGmv() {

    switchView("gmv");

    const container = document.getElementById("gmvReports");
    if (!container) return;

    container.innerHTML = `
        <div class="report-tabs">
            <button class="report-tab active" data-type="daily">Daily</button>
            <button class="report-tab" data-type="month">Month</button>
            <button class="report-tab" data-type="sku">SKU</button>
        </div>
        <div id="gmvReportContent"></div>
    `;

    renderGmvDaily();

    const tabs = container.querySelectorAll(".report-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const type = tab.dataset.type;

            if (type === "daily") renderGmvDaily();
            if (type === "month") renderGmvMonth();
            if (type === "sku") renderGmvSku();
        });
    });
}

function renderGmvDaily() {
    const data = getGmvDailyReport();
    renderGmvDailyReport(data, "gmvReportContent");
}

/* Placeholder functions for future reports */
function renderGmvMonth() {
    const container = document.getElementById("gmvReportContent");
    container.innerHTML = "<p>Month-wise GMV Report coming next...</p>";
}

function renderGmvSku() {
    const container = document.getElementById("gmvReportContent");
    container.innerHTML = "<p>SKU-wise GMV Report coming next...</p>";
}

/* ===========================
   INIT
=========================== */

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

            }, 300);
        });
    });

    return renderSummary;
}
