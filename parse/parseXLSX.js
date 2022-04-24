const xlsx = require("xlsx");
let file;
let workbook;

async function fromXLSX(to, filePath) {
    let result;
    file = filePath;
    workbook = await xlsx.readFile(file);

    switch (to.toLowerCase()) {
        case 'csv':
            result = await toCSV();
            break;
        case 'txt':
        case 'text':
            result = await toTXT();
            break;
        default:
            result = {
                error: 'Output format not supported !'
            };
    }

    return result;
}

async function toCSV() {
    let csv = [];

    workbook.SheetNames.forEach((sheetName) => {
        csv.push(xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName]));
    });

    return csv;
}

async function toTXT() {
    let txt = [];

    workbook.SheetNames.forEach((sheetName) => {
        txt.push(xlsx.utils.sheet_to_txt(workbook.Sheets[sheetName], {type: 'string'}));
    });

    return txt;
}

module.exports = {fromXLSX};
