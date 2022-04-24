const {convert} = require('html-to-text');
const fs = require("fs");

async function fromHTML(to, file) {
    let result;

    switch (to.toLowerCase()) {
        case 'text':
        case 'txt':
            result = await toTXT(file)
            break;
        default:
            result = {
                error: 'Output format not supported !'
            };
    }

    return result;
}

async function toTXT(file) {
    const html = fs.readFileSync(file);
    return convert(html.toString());
}

module.exports = {fromHTML};
