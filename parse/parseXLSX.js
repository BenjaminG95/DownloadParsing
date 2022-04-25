const xlsx = require("xlsx");
const {getError} = require("../messages");
let file;
let workbook;

async function fromXLSX(to, filePath) {
    let result;
    file = filePath;
    workbook = await xlsx.readFile(file);

    switch (to.toLowerCase()) {
        case 'csv':
            result = await toCSV() ?? getError('ParsingFailed');
            break;
        case 'txt':
        case 'text':
            result = await toTXT() ?? getError('ParsingFailed');
            break;
        case 'json':
            result = await toJSON() ?? getError('ParsingFailed');
            break;
        default:
            result = getError('Output404');
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

async function toJSON() {
    let json = [];

    workbook.SheetNames.forEach((sheetName) => {
        json.push(xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]));
    });

    return json;
}

module.exports = {fromXLSX};
