const jwt = require("jsonwebtoken");
const AuthController = require("../controllers/auth.controller");

function UserExists(req, res, next) {
    const bearerToken = req.headers.authorization;
    const token = !!bearerToken ? bearerToken.split(' ')[1] : null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.id;

        AuthController.getByUserId(userId).then(user => {
            req.context.set('user', user)
            next();
        }).catch(err => res.status(404).send(err.message));
    } catch(e) {
        res.status(500).send(e)
    }
}

module.exports = {
    UserExists: UserExists
}