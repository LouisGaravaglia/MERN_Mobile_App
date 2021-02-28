const expressJwt = require("express-jwt");
// const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
// const api = process.env.API_URL

function authJwt() {
    console.log("im in authRequired***********");
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"]},
            {url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"]},
            "/api/v1/users/login",
            "/api/v1/users/register"
        ]
    });
};

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true);
    };

    done();
}

// function authRequired(err, req, res, next) {
//     try {
//         console.log("im in authRequired***********");
//         const tokenStr = req.body._token || req.query._token;
//         let token = jwt.verify(tokenStr, secret);
//         req.username = token.username;
//         return next();
//     } catch (e) {
//         let unauthorized = new Error("You must authenticate first")
//         unauthorized.status = 401;
//         return next(unauthorized);
//     }
// }

module.exports = authJwt;