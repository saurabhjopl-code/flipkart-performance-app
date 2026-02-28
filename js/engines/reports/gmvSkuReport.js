import { getState } from "../../core/stateManager.js";

export function getGmvSkuReport() {

    const state = getState();
    const data = state.filteredData.GMV_SKU || [];

    if (!data || data.length === 0) return [];

    // Normalize numeric GMV
    const cleaned = data.map(row => ({
        ...row,
        GMV: Number(row.GMV || 0)
    }));

    // Sort by GMV descending
    cleaned.sort((a, b) => b.GMV - a.GMV);

    // Return top 50
    return cleaned.slice(0, 50);
}
