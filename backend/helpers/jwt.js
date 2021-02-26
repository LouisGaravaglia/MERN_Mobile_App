// const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

function authRequired(err, req, res, next) {
    try {
        console.log("im in authRequired***********");
        const tokenStr = req.body._token || req.query._token;
        let token = jwt.verify(tokenStr, secret);
        req.username = token.username;
        return next();
    } catch (e) {
        let unauthorized = new Error("You must authenticate first")
        unauthorized.status = 401;
        return next(unauthorized);
    }
}

module.exports = authRequired;