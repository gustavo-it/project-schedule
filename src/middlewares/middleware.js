exports.middlewareGlobal = (req, res, next) => {
    if(req.body.cliente) {
        console.log(`Vi que você postou ${req.body.cliente}`)
    };
    next();
};

exports.checkCsrfError = (error, req, res, next) => {
    if(error && error.code === 'EBADCSRFTOKEN') {
        return res.render('erroCsrf');
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};