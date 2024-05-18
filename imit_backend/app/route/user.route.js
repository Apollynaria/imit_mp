module.exports = (app) => {
    var { authJwt, verifySignUp, verifyAccess } = require("../middleware");
    const user = require('../controller/user.controller');

    app.use((req, res, next) => {
        // подключаем заголовки для авторизации
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/users', [authJwt.verifyToken, verifyAccess.userHaveAdminConference], user.findAll);
    app.post('/api/addUser',[verifySignUp.checkDuplicateLogin], user.create);
    
    app.post('/api/updateUserData', [authJwt.verifyToken], user.updateUserData);
    app.post('/api/updateUserPassword', [authJwt.verifyToken], user.updateUserPassword);
    app.post('/api/updateUserAdmin/:id',[authJwt.verifyToken, verifyAccess.userIsSuperAdmin], user.updateUserAdmin);

    // app.post('/api/deleteUser/:id', user.delete);
    
    app.get('/api/userProfile', [authJwt.verifyToken], user.findById);
    // app.get('/api/user/login/:login', user.findByLogin);
    
};