// Author : Vassili JOFFROY & Benjamin GALOIS

const Apify = require('apify');
const fs = require("fs");
const xlsx = require('xlsx')
const path = require("path");
const Downloader = require("nodejs-file-downloader");
const UserAgent = require("user-agents");

Apify.main(async () => {
    const input = await Apify.getInput();

    const ID = Date.now();
    const DIR = path.resolve(__dirname, './' + ID);

    fs.mkdirSync(DIR);

    let fileName;

    const userAgent = new UserAgent();
    const downloader = new Downloader({
        url: input.url,
        headers: {'User-Agent': userAgent.toString()},
        directory: DIR,
        cloneFiles: false,
        onBeforeSave: (deducedName) => {
            fileName = deducedName;
        },
    });

    try {
        await downloader.download();
    } catch (error) {
        return error;
    }

    const workbook = xlsx.readFile(DIR + '/' + fileName);
    const sheet = workbook.Sheets[workbook.SheetNames[1]];
    const csv = xlsx.utils.sheet_to_csv(sheet)

    fs.rmSync(DIR, {recursive: true});

    await Apify.setValue('OUTPUT', csv);

    return csv;
});
