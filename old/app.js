// Scan
// Convert
// and Replace

const fs = require('fs');

const Base64 = require('./tools/ad-base64');
const Replacer = require('./tools/ad-replacer');
const LineRow = require('./tools/zmnv-line-padding');
const CS = require('./tools/zmnv-colorizer');
const Helpers = require('./tools/ad-helpers');

const Logo = require('../stuff/ad-logo');

const CONFIG = require('./config');

const localStorage = {
    OriginalImagesSize: 0,
    EncodedImagesSize: 0
};

// ${LineRow('', '', 30)}

const PostReport = () => {
    const sizeOriginal = Helpers.NumToKb(localStorage.OriginalImagesSize);
    const sizeEncoded = Helpers.NumToKb(localStorage.EncodedImagesSize);
    const percentMessage = Helpers.MeasurePercentMessage(localStorage.OriginalImagesSize, localStorage.EncodedImagesSize);
    const delta = Helpers.MeasureDeltaMessage(localStorage.EncodedImagesSize, localStorage.OriginalImagesSize);

    const message = `
${LineRow(CS('Original Images: ', 92), CS(sizeOriginal, 92), 41)}
${LineRow(CS('Encoded base64 Images: ', 93), CS(sizeEncoded, 93), 41)}

${LineRow(CS('Difference: ', 96), `${CS(delta, 96)} ${CS(percentMessage, 96)}`, 41)}
    `;
    console.log(message);
};

const ConvertAndReplace = (_file, _filetypes, _directory) => {
    if (_filetypes.test(_file)) {

        const localFileSize = fs.statSync(_directory + '/' + _file).size;
        localStorage.OriginalImagesSize = localStorage.OriginalImagesSize + localFileSize;

        const fileSize = (localFileSize/1000).toFixed(2);

        console.log(LineRow(`${CS('>', 90)} ${CS(_file, 92)} `, `${CS(fileSize+' Kb', 92)}`, 50));

        const encoded = Base64.Encoder(_directory, _file);
        localStorage.EncodedImagesSize = localStorage.EncodedImagesSize + encoded.length;
        
        Replacer(CONFIG.filePath, _file, encoded);

    } else {
        const message = `> ${_file} – is not an image\n`;
        console.log(`${CS(message, 95)}`);
    }
};

const ScanConvertAndReplace = (_directory, _filetypes) => {
    fs.readdir(_directory, (err, files) => {

        files.forEach(file => {
            ConvertAndReplace(file, _filetypes, _directory);
        });

        setTimeout(() => {
            console.log(CS(`\n* Scanned ${files.length} files in folder`, 95));
            PostReport();
        }, 0);
    });
};

const Banner = () => {
    console.log(Logo);
    console.log(`${CS('Scanning folder:', 94)} ${CS(CONFIG.workDirectory, 96)}`);
    console.log(`${CS('Replace in file:', 94)} ${CS(CONFIG.fileName, 96)}\n`);
};

const SCAR = (_directory, _filetypes = CONFIG.regExpImages) => {

    Banner();

    setTimeout(() => {
        ScanConvertAndReplace(_directory, _filetypes);
    }, 1000);

    
};


module.exports = SCAR;
