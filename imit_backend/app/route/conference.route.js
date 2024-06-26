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
    // app.get('/api/adminConference/:id', [authJwt.verifyToken, verifyAccess.userIsAdminConference], conference.findByIdAdmin);

    app.post('/api/updateConference', [authJwt.verifyToken], conference.update);
    
    app.get('/api/conference/:id', conference.findById);
    app.get('/api/conferenceAdmin/:id', [authJwt.verifyToken], conference.findByIdAdmin);

    app.get('/api/confernecesForAdmin', [authJwt.verifyToken], conference.findAllForAdmin);
    app.get('/api/conferences', conference.findAllSortByDateBegin);

    app.get('/api/conferenceForRequest/:id', conference.findByIdForRequest);
    app.get('/api/conferencesForRequest', conference.findAllForRequest);

    app.get('/api/conferenceForSchedule/:id', [authJwt.verifyToken], conference.findAllForSchedule);
};