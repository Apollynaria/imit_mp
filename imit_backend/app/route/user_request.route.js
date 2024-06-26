module.exports = (app) => {
    var { authJwt, verifyAccess } = require("../middleware");
    const user_request = require('../controller/user_request.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/addUserRequest', [authJwt.verifyToken], user_request.create);

    app.get('/api/userRequests', [authJwt.verifyToken], user_request.findAllUserRequests);

    app.get('/api/requests', [authJwt.verifyToken], user_request.findAllRequestsForAdmin);

    app.get('/api/request/:id', [authJwt.verifyToken], user_request.findById);

    app.post('/api/updateUserRequest', [authJwt.verifyToken], user_request.update);
};