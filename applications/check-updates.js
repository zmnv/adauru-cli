const { get } = require('https');

const { version } = require('../package.json');
const { cs } = require('../zmnv');

const updateMessageCommand = `${cs('Run', 93)} ${cs('npm i -g adauri-cli', 92, 1)} ${cs('to update!', 93)}`;

const updateMessage = (newVersion, currentVersion) => `
  ${cs('New version is available!', 93)} ${cs(currentVersion, 91)} → ${cs(newVersion, 92)}
  ${cs('┌────────────────────────────────────┐', 93)}
  ${cs('│', 93)} ${updateMessageCommand} ${cs('│', 93)}
  ${cs('└────────────────────────────────────┘', 93)}
`;

const CheckUpdates = function () {
    get('https://raw.githubusercontent.com/zmnv/adauru-cli/master/package.json', response => {
        // const total = response.headers["content-length"];

        response.on('data', chunk => {
            const res = JSON.parse(chunk.toString());
            const isVersionsEqual = res.version === version;

            if(!isVersionsEqual) console.log(updateMessage(res.version, version));
        });

        response.on('error', () => {});

    }).on('error', () => {});
};

module.exports = CheckUpdates;