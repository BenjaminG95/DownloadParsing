const pdf2txt = require("pdf-to-text");

async function fromPDF(to, file) {
    let result;

    switch (to.toLowerCase()) {
        case 'pdf':
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
    pdf2txt.pdfToText(file, function (error, txt) {
        return (error) ? { error: error } : txt;
    });
}

module.exports = { fromPDF };
