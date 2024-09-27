function customLogger(req, res, next) {
    console.log('${req.method} request to ${req.url}');
    next();
}

function requestTimeLogger(req, res, next) {
    req.requestTime = new Date().toISOString();
    console.log('Request Time: ${req.requestTime}');
    next();
}

module.exports = { customLogger, requestTimeLogger };