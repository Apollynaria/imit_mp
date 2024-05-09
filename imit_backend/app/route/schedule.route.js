module.exports = (app) => {
    var { authJwt, verifyAccess } = require("../middleware");
    const schedule = require('../controller/schedule.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/addSchedule', [authJwt.verifyToken], [verifyAccess.userIsAdminConference], schedule.create);
 
};