const {convert} = require('html-to-text');
const fs = require("fs");
const {getError} = require("../messages");

async function fromHTML(to, file) {
    let result;

    switch (to.toLowerCase()) {
        case 'text':
        case 'txt':
            result = await toTXT(file) ?? getError('ParsingFailed');
            break;
        default:
            result = getError('Output404');
    }

    return result;
}

async function toTXT(file) {
    const html = fs.readFileSync(file);
    return convert(html.toString());
}

module.exports = {fromHTML};
