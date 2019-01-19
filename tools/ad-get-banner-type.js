const getBannerType = banner => {
    const isGoogleWebDesigner = /Google Web Designer/g.test(JSON.stringify(banner));

    if (isGoogleWebDesigner) return 'Google Web Designer';
    else return 'UNKNOWN';
};

module.exports = getBannerType;
