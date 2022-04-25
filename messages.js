const messages = {
    'DownloadOk': 'The file has been correctly downloaded !',
    'RetryMax' : 'Max attempts reached for downloading the file !'
}

function getMessage(key) {
    return messages[key] ?? getError('Key404');
}

const errors = {
    'Key404': 'Key not found !',
    '403': 'Response : Forbidden',
    'Output404': 'Output format not supported !',
    'Input404': 'Input format not supported !',
    'ParsingFailed': "Parsing Failed, can't exploit the file !",
    'Download': "File can't be downloaded !",
    'Input': 'Some input parameters are missing !'
}

function getError(key) {
    return {
        error: errors[key] ?? errors['Key404']
    };
}


module.exports = {getMessage, getError}