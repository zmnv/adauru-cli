const AdScanner = require('../tools/ad-scanner');
const ENV = require('../environment');

const JustScanner = () => {

    AdScanner(ENV.currentPath)
        .then(res => {
            console.log(res.TelemetryMessage);
        });
};

// JustScanner();

module.exports = JustScanner;
