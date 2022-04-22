// Author : Benjamin

const Apify = require('apify');
const fs = require("fs");
const xlsx = require('xlsx')

async function waitFile(filename) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(filename)) {
            await delay(3000);
            await waitFile(filename);
            resolve();
        } else {
            resolve();
        }
    })
}

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

Apify.main(async () => {
    const input = await Apify.getInput();

    const browser = await Apify.launchPuppeteer({launchOptions: {headless: true, ignoreHTTPSErrors: true}});
    const page = await browser.newPage();

    if (fs.existsSync(input.fileName)) {
        fs.unlinkSync(input.fileName);
    }

    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: './'
    });
    await page.goto(input.url).catch((e) => (""));

    await waitFile(input.fileName);

    const workbook = xlsx.readFile(input.fileName);
    const sheet = workbook.Sheets[workbook.SheetNames[1]];
    const csv = xlsx.utils.sheet_to_csv(sheet)

    console.log(csv)
    fs.unlinkSync(input.fileName);

    await Apify.setValue('OUTPUT', csv);
    
    return csv;
});