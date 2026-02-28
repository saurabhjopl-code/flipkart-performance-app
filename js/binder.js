import { setView } from "./core/stateManager.js";
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
   VIEW SWITCHER (CORRECT WAY)
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
   SUMMARY VIEW
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
   GMV VIEW
=========================== */

function renderGmv() {

    switchView("gmv");

    const reportData = getGmvDailyReport();
    renderGmvDailyReport(reportData);
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

            }, 400);
        });
    });

    return renderSummary;
}
