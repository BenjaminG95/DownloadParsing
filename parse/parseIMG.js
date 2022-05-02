const img = require("node-tesseract-ocr");
const {getError} = require("../messages");

let file;

async function fromIMG(to, filePath) {
    let result;
    file = filePath;
    switch (to.toLowerCase()) {
        case 'txt':
            result = await toTXT(file) ?? getError('ParsingFailed');
            break;
        default:
            result = getError('Output404');
    }
    return result;
}

async function toTXT(file) {

    return await img.recognize(file)
        .then((result) => {
            return result;
        })
        .catch((e) => {
            return {error: e}
        })
}

module.exports = {fromIMG};