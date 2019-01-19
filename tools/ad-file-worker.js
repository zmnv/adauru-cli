const fs = require('fs');
const cs = require('../zmnv/zmnv-colorizer');

function getNames(_filePath, _fileName) {
    let newFileName = _filePath.split('/');
    newFileName = newFileName[newFileName.length - 1];

    const original = _filePath + '/' + _fileName;
    const duplicated = _filePath + '/build/' + newFileName + '.html';

    return {
        original,
        duplicated
    };
}

const Process = (_filePath, _fileName) => {

    const { original, duplicated } = getNames(_filePath, _fileName);

    console.log(`
${cs('Tryin to Duplicate:', 95)}
${cs('  from', 95)} ${cs(original, 95)}
${cs('  to', 95)} ${cs(duplicated, 97, 1)}
    `);

    const dir = `/${_filePath}/build`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    return new Promise(
        resolve => resolve(fs.createReadStream(original).pipe(fs.createWriteStream(duplicated)))
    );

};

module.exports = Process;
