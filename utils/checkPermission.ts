import jsonwebtoken from "jsonwebtoken";

function getQueryName(req) {
    const splitByWhitespace = req.body.query.split("(")[0].split(" ");
    return splitByWhitespace[splitByWhitespace.length - 1]
}

export function checkPermission(req, res, next) {
    const queryName = req.body.operationName || getQueryName(req);
    if (["login", "register","productStatus"].indexOf(queryName) !== -1) return next();
    const fullToken = req.header("Authorization");
    if (!fullToken)
        return res.status(403).send("Unauthorized!");
    const token = fullToken.substring(7)
    const secret = process.env.JWT_SECRET
    try {
        jsonwebtoken.verify(token, secret);
    } catch (e) {
        return res.status(403).send("Unauthorized!");
    }
    next()
}