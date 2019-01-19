const Base64 = require('./tools/ad-base64');
const AdReplacer = require('./tools/ad-replacer');
const AdScanner = require('./tools/ad-scanner');
const AdFileWorker = require('./tools/ad-file-worker');

const ENV = require('./environment');

const DisplayImages = (imagesList = []) => {
    imagesList.forEach(element => {
        console.log(element);
    });
};

/* AdFileWorker('/Users/zmnv/AU.RU/dev/Almat', 'index.html')
    .then(result => {
        // Replace(result.path);
    });


function Replace (_path, _imagesList) {
    setTimeout(() => {
        AdReplacer(_path, 'sl1_blocks.png', '$q1412529adjaksdjlaks$!4aDAdasdkaskjdkashfkjashfkjahfk$!$!$98(A*&*A^dadajkda');
    }, 1000);
} */

AdScanner('/Users/zmnv/AU.RU/dev/Almat')
    .then(res => {
        console.log(res.TelemetryMessage);

        const Tele = res.Telemetry;
        const imagesList = Tele.files.imagesFiles;

        if(!Tele.common.defaultFileFound) console.log('Sorry, I canт продолжать далее...\n');

        if(imagesList) DisplayImages(imagesList);

        DisplayImages(Encoder(imagesList));
    });

function Encoder (_imagesList = []) {

    const exit = [];

    _imagesList.forEach((element, index) => {
        exit.push({ original: element.name, originalSize: element.size, encoded: '$$$$$$$$$$$', encodedSize: 123 });
    });

    return exit;
}

/* setTimeout(() => {
    AdReplacer(maks, 'sl1_blocks.png', '$q1412529adjaksdjlaks$!4aDAdasdkaskjdkashfkjashfkjahfk$!$!$98(A*&*A^dadajkda');
}, 0); */


/* function ScanAndProcess(filePath) {
    AdScanner('/Users/zmnv/AU.RU/dev/Almat')
    .then(res => {
        console.log(res.TelemetryMessage);

        const Tele = res.Telemetry;
        const imagesList = Tele.files.imagesFiles;

        if(!Tele.common.defaultFileFound) console.log('Sorry, I canт продолжать далее...\n');

        if(imagesList) DisplayImages(imagesList);

            
    });
} */
