module.exports = (app) => {
    var { authJwt, verifySignUp } = require("../middleware");
    var auth = require("../controller/auth.controller");

    app.use((req, res, next) => {

        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/register", [verifySignUp.checkDuplicateLogin], auth.register);

    app.post("/api/login", auth.login);

    app.post("/api/logout", auth.logout);

    app.get("/api/userBoard", [authJwt.verifyToken], auth.userBoard);
};