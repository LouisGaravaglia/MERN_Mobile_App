function errorHandler(err, req, res, next) {
    if (err) {
        res.status(404).json({message: err})
    }
};

module.exports = errorHandler;