import { initBinder } from "./binder.js";
import { initHeader } from "./renderers/headerRenderer.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("App Booting...");

    initHeader();
    initBinder();

});
