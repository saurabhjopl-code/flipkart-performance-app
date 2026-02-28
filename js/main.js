import { initBinder } from "./binder.js";
import { initHeader } from "./renderers/headerRenderer.js";
import { DATA_SOURCES } from "./config/dataSources.js";
import { fetchCSV } from "./core/dataFetcher.js";
import { setRawData } from "./core/stateManager.js";
import { startProgress, finishProgress } from "./engines/progress/progressEngine.js";
import { initFilters } from "./engines/filters/filterEngine.js";

document.addEventListener("DOMContentLoaded", async () => {

    initHeader();
    initBinder();
    initFilters();

    startProgress();

    const rawData = {};

    for (const key in DATA_SOURCES) {
        rawData[key] = await fetchCSV(DATA_SOURCES[key]);
    }

    setRawData(rawData);

    finishProgress();

});
