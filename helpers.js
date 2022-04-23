const Downloader = require("nodejs-file-downloader");
const UserAgent = require("user-agents");
const parse = require("./parse");
const path = require("path");
const fs = require("fs");

async function download(DIR, url) {
    const userAgent = new UserAgent();

    let fileName;

    const downloader = new Downloader({
        url: url,
        headers: { 'User-Agent': userAgent.toString() },
        directory: DIR,
        cloneFiles: false,
        onBeforeSave: (deducedName) => {
            fileName = DIR + '/' + deducedName;
        },
    });

    try {
        await downloader.download();
    } catch (error) {
        fileName = null;
    }

    return fileName;
}

const inputFormats = [
    'xlsx', 'xls',
    'html', 'htm',
    'pdf',
];

async function getOutput(file, format) {
    let output;
    const inputFormat = (file.split('.')).at(-1);

    if (inputFormats.includes(inputFormat)) {
        switch (inputFormat) {
            case 'xls':
            case 'xlsx':
                output = await parse.fromXLSX(format, file)
                break;
            case 'html':
            case 'htm':
                output = await parse.fromHTML(format, file)
            case 'pdf':
                output = await parse.fromPDF(format, file)
        }
    } else {
        output = {
            error: 'Input format not supported !'
        }
    }

    return output;
}

function createDir() {
    const ID = Date.now();
    const DIR = path.resolve(__dirname, './' + ID);

    fs.mkdirSync(DIR);

    return DIR;
}

module.exports = { download, getOutput, createDir };
