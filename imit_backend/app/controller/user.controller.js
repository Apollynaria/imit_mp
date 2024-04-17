var db = require('../config/db.config.js');
var User = db.user;
var globalFunctions = require('../config/global.functions.js');
var bcrypt = require("bcryptjs");

exports.findAll = (req, res) => {
    db.sequelize.query(
        `SELECT * 
        FROM user
        ORDER BY user.surname`,
        {
            type: db.sequelize.QueryTypes.SELECT,
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    User.create({
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, 10),
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        place_of_work: req.body.place_of_work,
        email: req.body.email,
        phone: req.body.phone,
        is_admin: false,
        is_super_admin: false
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.updateUserData = (req, res) => {
    User.update({
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        place_of_work: req.body.place_of_work,
        phone: req.body.phone,
    },
        {
            where: {
                id: req.userId
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.updateUserPassword = (req, res) => {
    User.findByPk(req.userId)
        .then(user => {
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Неверный пароль"
                });
            }

            User.update({
                password: bcrypt.hashSync(req.body.newPassword, 10),
            }, {
                where: {
                    id: req.userId
                }
            })
                .then(() => {
                    globalFunctions.sendResult(res, 'Пароль успешно изменен!');
                })
                .catch(err => {
                    globalFunctions.sendError(res, err);
                });
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.updateUserAdmin = (req, res) => {
    User.findByPk(req.userId)
        .then(user => {

            if (!user.is_super_admin) {
                return res.status(401).send({
                    message: "Нет доступа!"
                });
            }

            User.update({
                is_admin: req.body.is_admin,
            },
                {
                    where: {
                        id: req.params.id
                    }
                }
            ).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });


};

exports.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    User.findByPk(req.userId)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findByLogin = (req, res) => {
    User.findAll({
        where: {
            login: req.params.login
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};