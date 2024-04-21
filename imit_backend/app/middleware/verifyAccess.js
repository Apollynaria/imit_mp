var db = require('../config/db.config.js');
var User = db.user;
const adminComm = require('../controller/admin_comm.controller.js');

exports.userIsSuperAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user && user.is_super_admin === true) {
            next();
        } else {
            res.status(400).send({
                message: "Пользователь не является суперадмином"
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || "Произошла ошибка при поиске пользователя по id." });
    });
};


exports.userIsAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user && user.is_admin === true) {
            next();
        } else {
            res.status(400).send({
                message: "Пользователь не является админом"
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || "Произошла ошибка при поиске пользователя по id." });
    });
};

exports.userIsAdminConference = (req, res, next) => {

    try {
        const isAdmin = adminComm.checkAdminUserExistence(req.params.id, req.userId);
        if (isAdmin) {
            next();
        } else {
            res.status(400).send({
                message: "Пользователь не является админом конференции"
            });
        }
    }
    catch (error) {
        globalFunctions.sendError(res, err);
    }

};