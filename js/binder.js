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
import { getGmvMonthReport } from "./engines/reports/gmvMonthReport.js";

import { renderGmvDailyReport, renderGmvMonthReport } from "./renderers/reportRenderer.js";

function renderSummary() {

    const gmvData = calculateGmvSummary();
    const adsData = calculateAdsSummary();
    const trafficData = calculateTrafficSummary();

    renderExecutiveSummary(gmvData, adsData, trafficData);

    renderLineChart("gmvChart", prepareGmvChartData());
    renderLineChart("adsChart", prepareAdsChartData());
    renderLineChart("trafficChart", prepareTrafficChartData());
}

async function renderGmv(viewType = "daily") {

    const container = document.getElementById("gmvReports");
    container.innerHTML = "";

    if (viewType === "daily") {
        const data = getGmvDailyReport();
        renderGmvDailyReport(data, "gmvReports");
    }

    if (viewType === "month") {
        const data = await getGmvMonthReport();
        renderGmvMonthReport(data, "gmvReports");
    }
}

export function initBinder() {

    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach(button => {
        button.addEventListener("click", async () => {

            const view = button.dataset.view;

            startProgress();

            setTimeout(async () => {

                setView(view);
                renderNavigation(view);

                if (view === "summary") renderSummary();
                if (view === "gmv") await renderGmv("daily");

                finishProgress();

            }, 300);
        });
    });
}
