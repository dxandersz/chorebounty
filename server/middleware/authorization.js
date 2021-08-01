const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const jwtToken = req.header("token");
    try {
        if(!jwtToken) {
            return res.status(403).json("Not Authorized!");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Not Authorized!");
    }
    next();
}; 