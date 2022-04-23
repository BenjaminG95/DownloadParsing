// Author : Vassili JOFFROY & Benjamin GALOIS
const Apify = require('apify');
const fs = require("fs");
const helpers = require("./helpers");

Apify.main(async () => {
    const input = await Apify.getInput();
    let output;

    if (input.url === undefined || input.outputFormat === undefined) {
        output = {error: "url or outputFormat input are missing !"};
    } else {
        const DIR = helpers.createDir();
        let file = await helpers.download(DIR, input.url);

        output = (file)
            ? await helpers.getOutput(file, input.outputFormat)
            : {error: "File can't be downloaded !"};

        fs.rmSync(DIR, {recursive: true});
    }

    await Apify.setValue('OUTPUT', output);

    return output;
});
