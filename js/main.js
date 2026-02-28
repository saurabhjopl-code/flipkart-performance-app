import { initBinder } from "./binder.js";
import { initHeader } from "./renderers/headerRenderer.js";
import { DATA_SOURCES } from "./config/dataSources.js";
import { fetchCSV } from "./core/dataFetcher.js";
import { setRawData, setFilteredData } from "./core/stateManager.js";
import { startProgress, finishProgress } from "./engines/progress/progressEngine.js";

document.addEventListener("DOMContentLoaded", async () => {

    // Initialize header
    initHeader();

    // Initialize navigation + views
    initBinder();

    startProgress();

    const rawData = {};

    // Fetch all configured data sources
    for (const key in DATA_SOURCES) {
        try {
            rawData[key] = await fetchCSV(DATA_SOURCES[key]);
        } catch (error) {
            console.error(`Error loading ${key}:`, error);
            rawData[key] = [];
        }
    }

    // Set application state
    setRawData(rawData);
    setFilteredData(rawData); // For now filtered = raw (filters disabled)

    finishProgress();

    // Notify app that data is ready
    document.dispatchEvent(new Event("dataReady"));

});
