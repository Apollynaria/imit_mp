module.exports = (app) => {
    var { authJwt, verifyAccess } = require("../middleware");
    const check = require('../controller/check.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/addCheck', [authJwt.verifyToken], [verifyAccess.userIsAdminConference], check.create);

    // app.get('/api/userRequests', [authJwt.verifyToken], user_request.findAllUserRequests);

    // app.get('/api/requests', [authJwt.verifyToken], user_request.findAllRequestsForAdmin);

    // app.get('/api/request/:id', [authJwt.verifyToken], user_request.findById);
};