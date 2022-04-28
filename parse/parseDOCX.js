const mammoth = require("mammoth");
const {getError} = require("../messages");

async function fromDOCX(to, file) {
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
    return await mammoth.extractRawText({path: file})
        .then(function (result) {
            return result.value;
        })
        .catch(function (e) {
            return {error: e}
        });
}

module.exports = {fromDOCX};