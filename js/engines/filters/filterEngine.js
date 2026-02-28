import { getState } from "../../core/stateManager.js";
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
   APPLY FILTERS
=========================== */

export function applyFilters() {

    const state = getState();
    const currentView = state.view;

    /* ===========================
       SUMMARY VIEW
    =========================== */

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

    /* ===========================
       GMV VIEW
    =========================== */

    if (currentView === "gmv") {

        const reportData = getGmvDailyReport();
        renderGmvDailyReport(reportData, "gmvReportContent");

        return;
    }

    /* ===========================
       ADS VIEW (future ready)
    =========================== */

    if (currentView === "ads") {
        // Add when ads reports built
        return;
    }

    /* ===========================
       TRAFFIC VIEW (future ready)
    =========================== */

    if (currentView === "traffic") {
        // Add when traffic reports built
        return;
    }
}
