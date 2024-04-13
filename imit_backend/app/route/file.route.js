module.exports = (app) => {

    var { authJwt } = require("../middleware");
    const file = require('../controller/file.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/files', [authJwt.verifyToken], file.findAll);

    app.post('/api/addFile', file.create);
    
    app.post('/api/updateFile/:id', file.update);

    app.post('/api/deleteFile/:id', file.delete);
    
    app.get('/api/file/:id', file.findById);
    
};