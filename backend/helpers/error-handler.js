function errorHandler(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({message: "The user in not authorized"})
    } else {
        res.status(500).json({message: err})
    };
};

module.exports = errorHandler;