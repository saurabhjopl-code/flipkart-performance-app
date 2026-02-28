const STATE = {
    currentView: "summary",
    filters: {
        startDate: null,
        endDate: null,
        month: null
    },
    rawData: {},
    filteredData: {},
    loading: false
};

export function getState() {
    return STATE;
}

export function setView(view) {
    STATE.currentView = view;
}

export function setLoading(status) {
    STATE.loading = status;
}

export function setFilters(filters) {
    STATE.filters = { ...STATE.filters, ...filters };
}

export function setRawData(data) {
    STATE.rawData = data;
}

export function setFilteredData(data) {
    STATE.filteredData = data;
}
