const getExtention = body => {
    return body.split('.').slice(-1).toString();
};

module.exports = getExtention;
