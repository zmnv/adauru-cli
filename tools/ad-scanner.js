const fs = require('fs');

const line = require('../zmnv/zmnv-console-grids');
const cs = require('../zmnv/zmnv-colorizer');

const ENV = require('../environment');
const Helpers = require('./ad-helpers');

const Telemetry = {
    common: {
        defaultFileFound: false
    },
    files: {
        allFiles: [],
        imagesFiles: []
    },
    counters: {
        allFiles: 0,
        imagesFiles: 0
    },
    sizes: {
        allFolder: 0,
        allImages: 0,
        htmlFile: 0
    }
};

/**
 * @param {string} _directory 
 */
const AdScanner = (_directory) => {

    const isImagesRegExp = /(jpg|jpeg|png|gif|svg|bmp)$/;

    return new Promise(resolve => fs.readdir(_directory, (err, files) => {
        files.forEach(file => {
            const readFile = fs.statSync(`${_directory}/${file}`);

            if (file.slice(0, 1) !== '.') {
                Telemetry.files.allFiles.push(file);
                Telemetry.sizes.allFolder = Telemetry.sizes.allFolder + readFile.size;
            }

            if (file === ENV.defaultFile) {
                Telemetry.common.defaultFileFound = true;
                Telemetry.sizes.htmlFile = Telemetry.sizes.htmlFile + readFile.size;
            }

            if (isImagesRegExp.test(file)) {
                Telemetry.files.imagesFiles.push({
                    name: file,
                    size: readFile.size
                });
                Telemetry.sizes.allImages = Telemetry.sizes.allImages + readFile.size;
            }
        });

        setTimeout(() => {
            MeasureTelemetry();
            resolve({
                TelemetryMessage: TelemetryReporter(_directory),
                Telemetry
            });
        }, 0);
    }));
};

function MeasureTelemetry() { 
    Telemetry.counters.allFiles = Telemetry.files.allFiles.length;
    Telemetry.counters.imagesFiles = Telemetry.files.imagesFiles.length;
}

function TelemetryReporter(_directory) {

    const isDefaultHtmlFound = Telemetry.common.defaultFileFound ? Helpers.ConvertToKbColored(Telemetry.sizes.htmlFile, 350000, 190000) : cs('NOT FOUND', 91, 1);

    const _textPadding = 38;
    const textScanningFolder = `${cs('Scanning folder', 94)} ${cs(_directory + '...', 94, 1)}`;
    const textFoundAllFiles = line(cs(`> Found ${Telemetry.counters.allFiles} files`, 95), Helpers.ConvertToKbColored(Telemetry.sizes.allFolder, 450000, 259000), _textPadding);
    const textFoundImages = line(cs(`  🏞  ${Telemetry.counters.imagesFiles} images`, 97), Helpers.ConvertToKbColored(Telemetry.sizes.allImages, 350000, 190000), _textPadding+1);
    const textDefaultHtml = line(cs(`  💎  ${ENV.defaultFile}`, 97), isDefaultHtmlFound, _textPadding+1);
    
    const textFoundImagesList = (_files, _textFoundImages, more = false) => {
        let textLines = '';

        _files.map(element => {
            textLines = textLines.concat(
                `${line(cs('   *  ', 90)+cs(element.name, 96), Helpers.ConvertToKbColored(element.size, 100000, 60000), _textPadding+14)}\n`
            );
        });

        if(more) return `${_textFoundImages}\n\n${textLines}`;
        else return _textFoundImages;
    };

    const errorDefaultHtml = cs('[Error] – File ', 91) + cs(ENV.defaultFile, 91, 1) + cs(' not found.\n', 91);

    return `
${textScanningFolder}

${textFoundAllFiles}

${textFoundImagesList(Telemetry.files.imagesFiles, textFoundImages, true)}
${textDefaultHtml}
${Telemetry.common.defaultFileFound ? '' : '\n' + errorDefaultHtml}\
`;
}

/* 
AdScanner('/Users/zmnv/AU.RU/dev/Almat').then(result => {
    console.log(result.TelemetryMessage);
});
 */

module.exports = AdScanner;
