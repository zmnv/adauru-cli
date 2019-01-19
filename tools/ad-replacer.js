const replace = require('replace-in-file');

const line = require('../zmnv/zmnv-console-grids');
const cs = require('../zmnv/zmnv-colorizer');

const Helpers = require('./ad-helpers');
const getExtention = require('./ad-get-extension');
const Base64 = require('./ad-base64');

const replaceOptions = {
    allowEmptyPaths: false,
    encoding: 'utf8',
};

const changeReplaceOptions = (_file, _from, _to) => {
    replaceOptions.files = _file;
    replaceOptions.from = _from;
    if(_to) replaceOptions.to = `"${_to}"`;
};

const debugMessage = (_from, _to) => {
    const toMessage = `...${_to.slice(-27)}`;
    const base64Length = `${Helpers.MeasureSize(_to)} Kb`;

    return `
  ${cs(_from, 92)}
  ${line(cs('Result Length: ', 93), cs(base64Length, 93), 39)}
  ${cs(toMessage, 93)}
    `;
};

/**
 * ```
 * Replacer('abs-path-to-file', 'filename.ext', 'base64string'); 
 * ```
 */
const AdReplacer = (_file, findThis, replaceString) => {

    const fileExtension = getExtention(findThis);
    const htmlBase64String = Base64.Glue(replaceString, fileExtension);
    const searchPattern = new RegExp(`"${findThis}"`, 'g');

    changeReplaceOptions(_file, searchPattern, htmlBase64String);

    try {
        const changes = replace.sync(replaceOptions);
        if(changes.length) {
            console.log(debugMessage(findThis, htmlBase64String));
            console.log(`${cs('––––––––––––––––––––––––––––––––––––––––––\n', 90)}`);
        } else {
            console.log('\n' + cs(findThis, 92));
            console.log(`${cs('......Already encoded to base64 or not found.\n', 90)}`);
        }
    }
    catch (error) {
        console.error('........[Error] –', error);
    }
};

// AdReplacer('/Users/zmnv/AU.RU/dev/Almat/build/Almat.html', 'sl1_blocks.png', '$q1412529adjaksdjlaks$!4aDAdasdkaskjdkashfkjashfkjahfk$!$!$98(A*&*A^dadajkda');

module.exports = AdReplacer;
