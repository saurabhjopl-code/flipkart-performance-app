import { getState, setFilters } from "../../core/stateManager.js";

import { calculateGmvSummary } from "../summary/gmvSummaryBoxes.js";
import { calculateAdsSummary } from "../summary/adsSummaryBoxes.js";
import { calculateTrafficSummary } from "../summary/trafficSummaryBoxes.js";

import { prepareGmvChartData } from "../summary/gmvSummaryChart.js";
import { prepareAdsChartData } from "../summary/adsSummaryChart.js";
import { prepareTrafficChartData } from "../summary/trafficSummaryChart.js";

import { renderExecutiveSummary } from "../../renderers/summaryRenderer.js";
import { renderLineChart } from "../../renderers/chartRenderer.js";

import { getGmvDailyReport } from "../reports/gmvDailyReport.js";
import { renderGmvDailyReport } from "../../renderers/reportRenderer.js";

/* ===========================
   INITIALIZE FILTERS
=========================== */

export function initFilters() {

    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const monthSelect = document.getElementById("monthFilter");

    if (!startDateInput || !endDateInput || !monthSelect) return;

    startDateInput.addEventListener("change", handleFilterChange);
    endDateInput.addEventListener("change", handleFilterChange);
    monthSelect.addEventListener("change", handleFilterChange);
}

/* ===========================
   HANDLE FILTER CHANGE
=========================== */

function handleFilterChange() {

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const month = document.getElementById("monthFilter").value;

    setFilters({
        startDate,
        endDate,
        month
    });

    applyFilters();
}

/* ===========================
   APPLY FILTERS (NO REDIRECT)
=========================== */

export function applyFilters() {

    const state = getState();
    const currentView = state.view;

    /* ---------- SUMMARY ---------- */

    if (currentView === "summary") {

        const gmvData = calculateGmvSummary();
        const adsData = calculateAdsSummary();
        const trafficData = calculateTrafficSummary();

        renderExecutiveSummary(gmvData, adsData, trafficData);

        renderLineChart("gmvChart", prepareGmvChartData());
        renderLineChart("adsChart", prepareAdsChartData());
        renderLineChart("trafficChart", prepareTrafficChartData());

        return;
    }

    /* ---------- GMV ---------- */

    if (currentView === "gmv") {

        const reportData = getGmvDailyReport();
        renderGmvDailyReport(reportData, "gmvReportContent");

        return;
    }

    /* ---------- ADS ---------- */

    if (currentView === "ads") {
        return;
    }

    /* ---------- TRAFFIC ---------- */

    if (currentView === "traffic") {
        return;
    }
}
