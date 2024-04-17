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

    app.get('/api/conferences', conference.findAll);
    app.get('/api/time', conference.time);
    app.get('/api/conference/:id', conference.findById);
    app.get('/api/conferencesSorted', conference.findAllSorted);
    app.get('/api/conferencesSortByData5', conference.get5ConferencesSortByData);
    app.get('/api/conference/name/:name', conference.findByName);

    app.post('/api/addConference', [authJwt.verifyToken, verifyAccess.userIsAdmin], conference.create);
    // app.post('/api/updateConference/:id', [authJwt.verifyToken], conference.update);
    app.post('/api/deleteConference/:id', conference.delete);
    
    // app.get('/api/conference/date/:date', conference.findByDate);
};