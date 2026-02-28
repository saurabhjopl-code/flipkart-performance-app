import { getState, setFilters, setFilteredData } from "../../core/stateManager.js";
import { filterByDateRange, parseDate } from "../../core/dateUtils.js";

function populateMonthDropdown() {

    const state = getState();
    const data = state.rawData.GMV_DATE || [];

    const monthSet = new Set();

    data.forEach(row => {
        if (row["Order Date"]) {
            monthSet.add(row["Order Date"].substring(3, 10));
        }
    });

    const months = Array.from(monthSet).sort((a, b) => {
        const d1 = parseDate("01/" + a);
        const d2 = parseDate("01/" + b);
        return d1 - d2;
    });

    const select = document.getElementById("monthFilter");
    select.innerHTML = `<option value="">All</option>`;

    months.forEach(month => {
        select.innerHTML += `<option value="${month}">${month}</option>`;
    });

    if (months.length > 0) {
        select.value = months[months.length - 1];
        setFilters({ month: months[months.length - 1] });
    }
}

export function applyFilters() {

    const state = getState();
    const { startDate, endDate, month } = state.filters;

    const filtered = {};

    Object.keys(state.rawData).forEach(key => {

        const dataset = state.rawData[key];
        if (!dataset || dataset.length === 0) {
            filtered[key] = [];
            return;
        }

        const dateField = Object.keys(dataset[0]).find(col =>
            col.toLowerCase().includes("date")
        );

        let temp = dataset;

        if (month) {
            temp = temp.filter(row =>
                row[dateField] && row[dateField].includes(month)
            );
        } else {
            temp = filterByDateRange(dataset, startDate, endDate, dateField);
        }

        filtered[key] = temp;
    });

    setFilteredData(filtered);
}

export function initFilters(onFilterChange) {

    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");
    const monthSelect = document.getElementById("monthFilter");

    startInput.addEventListener("change", () => {
        setFilters({
            startDate: startInput.value ? new Date(startInput.value) : null,
            month: null
        });
        monthSelect.value = "";
        applyFilters();
        onFilterChange();
    });

    endInput.addEventListener("change", () => {
        setFilters({
            endDate: endInput.value ? new Date(endInput.value) : null,
            month: null
        });
        monthSelect.value = "";
        applyFilters();
        onFilterChange();
    });

    monthSelect.addEventListener("change", () => {
        setFilters({
            month: monthSelect.value,
            startDate: null,
            endDate: null
        });
        startInput.value = "";
        endInput.value = "";
        applyFilters();
        onFilterChange();
    });

    document.addEventListener("dataReady", () => {
        populateMonthDropdown();
        applyFilters();
        onFilterChange();
    });
}
