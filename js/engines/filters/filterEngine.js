import { getState, setFilters, setFilteredData } from "../../core/stateManager.js";
import { filterByDateRange } from "../../core/dateUtils.js";

export function applyFilters() {

    const state = getState();

    const { startDate, endDate } = state.filters;

    const filtered = {};

    Object.keys(state.rawData).forEach(key => {

        const dataset = state.rawData[key];

        if (!dataset || dataset.length === 0) {
            filtered[key] = [];
            return;
        }

        const dateField = Object.keys(dataset[0]).find(col =>
            col.toLowerCase().includes("date") || col.toLowerCase().includes("month")
        );

        if (!dateField) {
            filtered[key] = dataset;
            return;
        }

        filtered[key] = filterByDateRange(dataset, startDate, endDate, dateField);

    });

    setFilteredData(filtered);
}

export function initFilters() {

    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");

    startInput.addEventListener("change", () => {
        setFilters({ startDate: new Date(startInput.value) });
        applyFilters();
    });

    endInput.addEventListener("change", () => {
        setFilters({ endDate: new Date(endInput.value) });
        applyFilters();
    });

}
