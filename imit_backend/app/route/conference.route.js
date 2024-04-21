module.exports = (app) => {
    var { authJwt, verifyAccess } = require("../middleware");
    const conference = require('../controller/conference.controller');
    
    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/addConference', [authJwt.verifyToken, verifyAccess.userIsAdmin], conference.create);
    app.get('/api/adminConference/:id', [authJwt.verifyToken, verifyAccess.userIsAdminConference], conference.findById);
};