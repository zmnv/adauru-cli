const cs = (text, colorForeground, colorBackground) =>
    colorBackground ?
        `\x1b[${colorForeground}m\x1b[${colorBackground}m${text}\x1b[0m` :
        `\x1b[${colorForeground}m${text}\x1b[0m`;

module.exports = cs;
