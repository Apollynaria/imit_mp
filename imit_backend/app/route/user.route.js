

module.exports = (app) => {

    var { authJwt } = require("../middleware");
    const user = require('../controller/user.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/users', [authJwt.verifyToken], user.findAll);

    app.post('/api/addUser', user.create);
    
    app.post('/api/updateUserData/:id', user.updateUserData);
    app.post('/api/updateUserPassword/:id', user.updateUserPassword);
    app.post('/api/updateUserAdmin/:id', user.updateUserAdmin);

    app.post('/api/deleteUser/:id', user.delete);
    
    app.get('/api/user/:id', user.findById);
    app.get('/api/user/login/:login', user.findByLogin);
    
};