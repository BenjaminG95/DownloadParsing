// Author : Vassili JOFFROY & Benjamin GALOIS
const Apify = require('apify');
const helpers = require("./helpers");
const {getError} = require("./messages");

Apify.main(async () => {
    const input = await Apify.getInput();
    let output;

    if (input.url === undefined || input.outputFormat === undefined) {
        output = getError('Input');
    } else {
        const DIR = helpers.createDir();
        let file = await helpers.download(DIR, input.url);

        output = (file)
            ? await helpers.getOutput(file, input.outputFormat)
            : getError('Download');

        helpers.deleteDir(DIR);
    }

    await Apify.setValue('OUTPUT', output);

    return output;
});
