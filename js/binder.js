import { setView } from "./core/stateManager.js";
import { renderNavigation } from "./renderers/navigationRenderer.js";
import { startProgress, finishProgress } from "./engines/progress/progressEngine.js";
import { calculateGmvSummary } from "./engines/summary/gmvSummaryBoxes.js";
import { prepareGmvChartData } from "./engines/summary/gmvSummaryChart.js";
import { renderGmvSummaryBoxes } from "./renderers/summaryRenderer.js";
import { renderLineChart } from "./renderers/chartRenderer.js";

function renderSummary() {

    const summaryData = calculateGmvSummary();
    renderGmvSummaryBoxes(summaryData);

    const chartData = prepareGmvChartData();

    if (chartData.labels.length > 0) {
        renderLineChart("gmvChart", chartData);
    }
}

export function initBinder() {

    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach(button => {
        button.addEventListener("click", () => {

            const view = button.dataset.view;

            startProgress();

            setTimeout(() => {
                setView(view);
                renderNavigation(view);
                finishProgress();
            }, 400);

        });
    });

    return renderSummary;
}
