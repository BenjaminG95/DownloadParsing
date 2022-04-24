const pdf = require('pdf-parse');
const fs = require('fs');

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
    return await pdf(fs.readFileSync(file))
        .then(data => data.text)
        .catch(error => ({error: error}));
}

module.exports = {fromPDF};
