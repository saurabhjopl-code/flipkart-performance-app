import { getState, setFilters } from "../../core/stateManager.js";

import { getRawGmvData } from "../data/gmvDataLoader.js"; // must exist
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
   INIT FILTERS
=========================== */

export function initFilters() {

    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const monthSelect = document.getElementById("monthFilter");

    if (!startDateInput || !endDateInput || !monthSelect) return;

    populateMonthDropdown();

    startDateInput.addEventListener("change", handleFilterChange);
    endDateInput.addEventListener("change", handleFilterChange);
    monthSelect.addEventListener("change", handleFilterChange);
}

/* ===========================
   POPULATE MONTH DROPDOWN
=========================== */

function populateMonthDropdown() {

    const monthSelect = document.getElementById("monthFilter");
    if (!monthSelect) return;

    const rawData = getRawGmvData();
    if (!rawData || rawData.length === 0) return;

    const monthSet = new Set();

    rawData.forEach(row => {
        const date = new Date(row.OrderDate || row.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        monthSet.add(key);
    });

    const sortedMonths = Array.from(monthSet).sort().reverse();

    monthSelect.innerHTML = `<option value="">All</option>`;

    sortedMonths.forEach(month => {
        monthSelect.innerHTML += `<option value="${month}">${month}</option>`;
    });
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
   APPLY FILTERS
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
