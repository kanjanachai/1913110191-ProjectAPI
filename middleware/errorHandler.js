module.exports = (err, req, rers, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status_codee: statusCode,
        message: err.message,
        Validation: err.Validation
    })
}