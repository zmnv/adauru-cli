const AdScanner = require('../tools/ad-scanner');
const ENV = require('../environment');

const JustScanner = (pathName = ENV.currentPath) => {

    AdScanner(pathName)
        .then(res => {
            console.log(res.TelemetryMessage);
        });
};

// JustScanner();

module.exports = JustScanner;
