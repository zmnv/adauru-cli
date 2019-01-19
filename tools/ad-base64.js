const fs = require('fs');

function Encoder(fileFolder, fileName) {
    const fileToEncode = fs.readFileSync(fileFolder + '/' + fileName);

    return new Buffer.from(fileToEncode).toString('base64');
}

function EncoderList (_path, _imagesList = []) {
    const exit = [];

    _imagesList.forEach(element => {
        const hotEncoded = Encoder(_path, element.name);
        exit.push({ original: element.name, originalSize: element.size, encoded: hotEncoded, encodedSize: hotEncoded.length });
    });

    return exit;
}

function Glue(body, fileExtension) {
    const isImage = /(jpg|jpeg|png|gif)$/.test(fileExtension);
    const isSvg = /svg$/.test(fileExtension);

    if (isImage || isSvg) {
        const returnExtension = isImage ? 
            `data:image/${fileExtension};base64,${body}`
            :
            `data:image/svg+xml;base64,${body}`;
        return returnExtension;
    } 

    else return '<<< NOT AN IMAGE >>>';
}

// * Test > node ad-base64.js 
// console.log(base64_glue('<base64StringExample>', 'pdf'));

module.exports = {
    Encoder,
    EncoderList,
    Glue
};
