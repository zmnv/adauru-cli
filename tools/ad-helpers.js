const cs = require('../zmnv/zmnv-colorizer');

function ConvertToKb(_number = 0) {
    return `${(_number/1000).toFixed(2)} Kb`;
}

function ConvertToKbColored(_number, _dangerMinLimit, _warningMinLimit) {
    let color = 97;

    if (_dangerMinLimit || _warningMinLimit) color = 92;
    if (_number >= _dangerMinLimit) color = 91;
    if (_number >= _warningMinLimit && _number < _dangerMinLimit) color = 93;
    

    return cs(`${(_number/1000).toFixed(2)} Kb`, color);
}

function MeasureSize(_string) {
    return (_string.length/1000).toFixed(2);
}

function MeasureDelta(max, min) {
    return max - min;
}

function MeasureDeltaMessage(max, min) {
    const message = ConvertToKb(MeasureDelta(max, min));
    if (/-/g.test(message)) return `${cs(message, 92)}`;
    else return `${cs(message, 91)}`;
}

function MeasurePercent(max, find) {
    return (find * 100 / max - 100).toFixed(2);
}

function MeasurePercentMessage(max, find) {
    return `${MeasurePercent(max, find)}%`;
}

const getFileEnd = body => {
    return body.split('/').slice(-1).toString();
};

module.exports = {
    ConvertToKb,
    ConvertToKbColored,
    MeasureSize,
    MeasureDeltaMessage,
    MeasurePercentMessage,
    getFileEnd
};
