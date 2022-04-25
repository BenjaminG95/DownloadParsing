const pdf = require('pdf-parse');
const fs = require('fs');
const {getError} = require("../messages");

async function fromPDF(to, file) {
    let result;

    switch (to.toLowerCase()) {
        case 'txt':
        case 'text':
            result = await toTXT(file) ?? getError('ParsingFailed');
            break;
        default:
            result = getError('Output404');
    }
    return result;
}

async function toTXT(file) {
    return await pdf(fs.readFileSync(file))
        .then(data => data.text)
        .catch(error => ({error: error}));
}

module.exports = {fromPDF};
