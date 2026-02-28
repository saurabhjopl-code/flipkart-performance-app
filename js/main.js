import { initBinder } from "./binder.js";
import { initHeader } from "./renderers/headerRenderer.js";
import { DATA_SOURCES } from "./config/dataSources.js";
import { fetchCSV } from "./core/dataFetcher.js";
import { setRawData, setFilteredData } from "./core/stateManager.js";
import { startProgress, finishProgress } from "./engines/progress/progressEngine.js";
import { initFilters, applyFilters } from "./engines/filters/filterEngine.js";

document.addEventListener("DOMContentLoaded", async () => {

    initHeader();
    initFilters();
    initBinder();

    startProgress();

    const rawData = {};

    for (const key in DATA_SOURCES) {
        rawData[key] = await fetchCSV(DATA_SOURCES[key]);
    }

    setRawData(rawData);
    setFilteredData(rawData);

    applyFilters();

    finishProgress();

    document.dispatchEvent(new Event("dataReady"));

});
