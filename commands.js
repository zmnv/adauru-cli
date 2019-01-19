#!/usr/bin/env node

const program = require('commander');
const PACKAGE = require('./package.json');

const AdauruLogo = require('./tools/ad-logo');
const ENV = require('./environment');

program
    .version(PACKAGE.version, '-v, --version');

program
    .command('version')
    .description('Show version with logo.')
    .alias('v')
    .action(() => {
        console.log(AdauruLogo);
    });

program
    .command('scan')
    .description('Just scan current folder and show images list.')
    .alias('s')
    .action(() => {
        const JustScanner = require('./applications/just-scanner');
        console.log(AdauruLogo);

        setTimeout(() => {
            JustScanner();
        }, 600);
    });

program
    .command('duplicate')
    .description('Just duplicate index.html to build/<FolderName>.html.')
    .alias('d')
    .action(() => {
        console.log(AdauruLogo);

        setTimeout(() => {
            require('./applications/just-duplicate');
        }, 600);
    });

program
    .command('run')
    .description('Scan, Encode & Replace images in ' + ENV.defaultFile)
    .alias('r')
    .action(() => {
        const ScanDplicateReplace = require('./applications/scan-double-replace');
        console.log(AdauruLogo);

        setTimeout(() => {
            ScanDplicateReplace(ENV.currentPath);
        }, 600);
    });

program
    .parse(process.argv);
