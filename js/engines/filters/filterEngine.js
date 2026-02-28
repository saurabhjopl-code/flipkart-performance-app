import { getState, setFilters, setFilteredData } from "../../core/stateManager.js";
import { filterByDateRange, parseDate } from "../../core/dateUtils.js";

function populateMonthDropdown() {

    const state = getState();
    const data = state.rawData.GMV_DATE || [];

    const monthSet = new Set();

    data.forEach(row => {
        if (row["Order Date"]) {
            const d = parseDate(row["Order Date"]);
            if (d) {
                monthSet.add(`${d.getFullYear()}-${d.getMonth()}`);
            }
        }
    });

    const months = Array.from(monthSet).sort();

    const select = document.getElementById("monthFilter");
    select.innerHTML = `<option value="">All</option>`;

    months.forEach(m => {
        const [year, month] = m.split("-");
        const label = `${String(Number(month)+1).padStart(2,"0")}/${year}`;
        select.innerHTML += `<option value="${m}">${label}</option>`;
    });

    if (months.length) {
        select.value = months[months.length-1];
        setFilters({ month: months[months.length-1] });
    }
}

export function applyFilters() {

    const state = getState();
    const { startDate, endDate, month } = state.filters;
    const filtered = {};

    Object.keys(state.rawData).forEach(key => {

        const dataset = state.rawData[key];
        if (!dataset?.length) {
            filtered[key] = [];
            return;
        }

        const dateField = Object.keys(dataset[0]).find(col =>
            col.toLowerCase().includes("date")
        );

        let temp = dataset;

        if (month && dateField) {

            const [year, monthIndex] = month.split("-").map(Number);

            temp = dataset.filter(row => {
                const d = parseDate(row[dateField]);
                if (!d) return false;
                return (
                    d.getFullYear() === year &&
                    d.getMonth() === monthIndex
                );
            });

        } else if (dateField) {

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
        setFilters({ startDate: new Date(startInput.value), month: null });
        monthSelect.value = "";
        applyFilters();
        onFilterChange();
    });

    endInput.addEventListener("change", () => {
        setFilters({ endDate: new Date(endInput.value), month: null });
        monthSelect.value = "";
        applyFilters();
        onFilterChange();
    });

    monthSelect.addEventListener("change", () => {
        setFilters({ month: monthSelect.value, startDate: null, endDate: null });
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
