const fs = require('fs');
const {getError} = require("../messages");
const pdf = require("pdf-to-text");

let file;

async function fromPDF(to, filePath) {
    let result;
    file = filePath;
    switch (to.toLowerCase()) {
        case 'txt':
        case 'text':
            result = await toTXT() ?? getError('ParsingFailed');
            break;
        default:
            result = getError('Output404');
    }
    return result;
}

async function toTXT() {
    return new Promise((resolve, reject) => {
        pdf.pdfToText(file, (err, data) => {
            if (err) reject({errror: err});
            resolve(data);
        });
    });
}

module.exports = {fromPDF};
