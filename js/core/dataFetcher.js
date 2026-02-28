export async function fetchCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return parseCSV(text);
}

function parseCSV(csvText) {
    const lines = csvText.split("\n").filter(line => line.trim() !== "");
    const headers = lines[0].split(",");

    const data = lines.slice(1).map(line => {
        const values = line.split(",");
        const row = {};

        headers.forEach((header, index) => {
            row[header.trim()] = values[index] ? values[index].trim() : "";
        });

        return row;
    });

    return data;
}
