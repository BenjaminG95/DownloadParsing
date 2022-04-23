const xlsx = require("xlsx");

async function fromXLSX(to, file) {
    let result;

    switch (to.toLowerCase()) {
        case 'csv':
            result = await toCSV(file);
            break;
        default:
            result = {
                error: 'Output format not supported !'
            };
    }

    return result;
}

async function toCSV(file) {
    const workbook = xlsx.readFile(file);
    let csv = [];

    workbook.SheetNames.forEach((sheetName) => {
        csv.push(xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName]));
    });

    return csv;
}

module.exports = {fromXLSX};
