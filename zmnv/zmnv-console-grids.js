const CS = require('./zmnv-colorizer');

const defaultStyle = {
    padding: 40,
    placeholder: '.',
    color: 90
};

const LayoutLine = (leftString = '', rightString = '', padding = defaultStyle.padding, placeholder = defaultStyle.placeholder, placeholderColor = defaultStyle.color) => {

    const delta = padding - leftString.length;
    const deltaThreshold = 3;
    const lastOfString = 8;

    leftString =
    leftString.length > padding
        ? `${leftString.slice( 0, padding - lastOfString - 4 )}...${leftString.slice(-lastOfString)}`
        : `${leftString}`;

    if (delta > deltaThreshold - 1) {
        leftString = leftString.concat(' ');

        let i = 0;
        while (i < delta) {
            leftString = leftString.concat(`${CS(placeholder, placeholderColor)}`);
            i++;
        }
    }

    return `${leftString} ${rightString}`;
};

module.exports = LayoutLine;
