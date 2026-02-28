import { setLoading } from "../../core/stateManager.js";

export function startProgress() {
    const bar = document.getElementById("progressBar");
    setLoading(true);
    bar.style.width = "30%";

    setTimeout(() => {
        bar.style.width = "70%";
    }, 300);
}

export function finishProgress() {
    const bar = document.getElementById("progressBar");

    bar.style.width = "100%";

    setTimeout(() => {
        bar.style.width = "0%";
        setLoading(false);
    }, 300);
}
