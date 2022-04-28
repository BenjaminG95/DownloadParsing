const Downloader = require("nodejs-file-downloader");
const UserAgent = require("user-agents");
const parse = require("./parse");
const path = require("path");
const fs = require("fs");
const Apify = require("apify");
const {getMessage, getError} = require("./messages");

async function download(DIR, url) {
    const userAgent = new UserAgent();
    const proxyConfiguration = await Apify.createProxyConfiguration({
        countryCode: 'US',
    });

    let fileName;

    const downloader = new Downloader({
        url: url,
        headers: {'User-Agent': userAgent.toString()},
        directory: DIR,
        cloneFiles: false,
        onBeforeSave: (deducedName) => {
            console.log("downloading " + deducedName + "...")
            fileName = DIR + '/' + deducedName;
        },
        shouldStop(e) {
            if (e.statusCode) {
                console.log('error while downloading : ' + e.statusCode);
            } else {
                console.log(e);
            }

            return (e.statusCode !== 403);
        },
        onProgress(percentage) {
            if (!isNaN(percentage)) {
                console.log(percentage + '%');
            }
        },
        maxAttempts: 7,
        proxy: proxyConfiguration.newUrl(),
    });

    try {
        await downloader.download();
        console.log(getMessage('DownloadOk'));
    } catch (error) {
        fileName = null;
        console.log(getMessage('RetryMax'));
    }

    return fileName;
}

const inputFormats = [
    'xlsx', 'xls',
    'html', 'htm',
    'pdf',
    'docx',
];

async function getOutput(file, format) {
    let output;
    const inputFormat = (file.split('.')).at(-1);

    if (inputFormats.includes(inputFormat)) {
        switch (inputFormat) {
            case 'xls':
            case 'xlsx':
                output = await parse.fromXLSX(format, file);
                break;
            case 'html':
            case 'htm':
                output = await parse.fromHTML(format, file);
                break;
            case 'pdf':
                output = await parse.fromPDF(format, file);
                break;
            case 'docx':
                output = await parse.fromDOCX(format, file);
                break;
        }
    } else {
        output = getError('Input404');
    }

    return output;
}

function createDir() {
    const ID = Date.now();
    const DIR = path.resolve(__dirname, './' + ID);

    fs.mkdirSync(DIR);

    return DIR;
}

function deleteDir(DIR) {
    fs.rmSync(DIR, {recursive: true});
}

module.exports = {download, getOutput, createDir, deleteDir};
