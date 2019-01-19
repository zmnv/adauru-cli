const AdFileWorker = require('../tools/ad-file-worker');

const ENV = require('../environment');

AdFileWorker(ENV.currentPath, ENV.defaultFile)
    .then(result => {
        
        setTimeout(() => {
            console.log('RESULT', result.path);
        }, 500);

    });

module.exports = AdFileWorker;
