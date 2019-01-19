const {
    AdBase64,
    AdFileWorker,
    AdHelpers,
    AdReplacer,
    AdScanner,
    AdLogo,
} = require('../tools');

const cs = require('../zmnv/zmnv-colorizer');

const ENV = require('../environment');
const test = '/Users/zmnv/AU.RU/dev/Almat';

const ScanDuplicateReplace = (_path = test) => {

    AdScanner(_path)
        .then(res => {
            const Tele = res.Telemetry;
            const imagesList = Tele.files.imagesFiles;

            console.log(res.TelemetryMessage);

            if(!Tele.common.defaultFileFound) console.log(cs('Sorry, I canт продолжать далее...\n', 91, 1));
            else {
                
                DuplicateDefault(_path)
                    .then(res => {
                        if(res) {
                            console.log(`${cs('DONE!', 95, 1)} ${cs(ENV.defaultFile, 93, 1)} ${cs('duplicated.', 95)}`);

                            const imagesProcessList = AdBase64.EncoderList(_path, imagesList);
                            imagesProcessList.map(element => {
                                AdReplacer(res, element.original, element.encoded);
                            });

                            const doneMessage =
                                cs('Adauru Cli: ', 95)
                                + cs('ENCODE DONE!', 92, 1)
                                + '\n'
                                + cs('> Just check out the ', 97) 
                                + cs('/build/' + AdHelpers.getFileEnd(res), 97, 1)
                                + '\n';
                            console.log(doneMessage);
                        }
                        else console.log(cs('Error! File is not duplicated...', 91, 1)); 
                    });
            }
            
        });
};

function DuplicateDefault(_path = test) {
    return new Promise (resolve => {
        AdFileWorker(_path, ENV.defaultFile)
            .then(result => {
    
                setTimeout(() => {
                    resolve(result.path);
                }, 500);

            });
    });
}

// ScanDuplicateReplace();

module.exports = ScanDuplicateReplace;
