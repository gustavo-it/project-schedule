exports.middlewareGlobal = (req, res, next) => {
    if(req.body.cliente) {
        console.log(`Vi que você postou ${req.body.cliente}`)
    };
    next();
};

exports.checkCsrfError = (error, req, res, next) => {
    if(error) {
        return res.render('404');
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};