var db = require('../config/db.config.js');
var User = db.user;
var AdminConference = db.admin_conference;
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


exports.userHaveAdminConference = (req, res, next) => {
    AdminConference.findOne({
        where: {
            user_id: req.userId,
        }
    })
        .then(admin => {
            if (admin) {
                next();
            } else {
                res.status(400).send({
                    message: "Доступ ограничен"
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Доступ ограничен" });
        });
};

exports.userIsAdmin = (req, res, next) => {
    AdminConference.findByPk(req.userId).then(user => {
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
    AdminConference.findOne({
        where: {
            user_id: req.userId,
            conference_id: req.body.conference_id,
        }
    })
        .then(admin => {
            if (admin) {
                next();
            } else {
                res.status(400).send({
                    message: "Доступ ограничен"
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Доступ ограничен" });
        });
};

exports.userIsAdminConferenceOrCreator = (req, res, next) => {
    AdminConference.findOne({
        where: {
            user_id: req.userId,
            conference_id: req.body.conference_id,
        }
    })
        .then(admin => {
            if (admin) {
                next();
            } else {
                res.status(400).send({
                    message: "Доступ ограничен"
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Доступ ограничен" });
        });
};

