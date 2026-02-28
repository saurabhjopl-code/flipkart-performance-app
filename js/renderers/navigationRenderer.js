export function renderNavigation(activeView) {
    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");

        if (btn.dataset.view === activeView) {
            btn.classList.add("active");
        }
    });

    const views = document.querySelectorAll(".view-section");
    views.forEach(view => view.classList.remove("active-view"));

    const target = document.getElementById(`${activeView}View`);
    if (target) {
        target.classList.add("active-view");
    }
}
