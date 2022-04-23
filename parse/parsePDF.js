const pdf2txt = require("pdf-to-text");

async function fromPDF(to, file) {
    let result;

    switch (to.toLowerCase()) {
        case 'txt':
        case 'text':
            result = await toTXT(file);
            break;
        default:
            result = {
                error: 'Output format not supported !'
            };
    }
    return result;
}

async function toTXT(file) {
    return new Promise((resolve, reject) => {
        pdf2txt.pdfToText(file, (err, txt) => {
            err ? reject(err) : resolve(txt);
        });
    });
}

module.exports = {fromPDF};
