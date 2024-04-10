var { authJwt } = require("../middleware");

module.exports = (app) => {
    const user = require('../controller/user.controller');

    app.get('/api/users', [authJwt.verifyToken], user.findAll);
    app.post('/api/addUser', user.create);
    app.post('/api/updateUser/:id', user.update);
    app.post('/api/deleteUser/:id', user.delete);
    app.get('/api/user/:id', user.findById);
    app.get('/api/user/surname/:surname', user.findBySurname);
};