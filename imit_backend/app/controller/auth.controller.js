var db = require("../config/db.config");
var config = require("../config/auth.config");
var User = db.user;
var globalFunctions = require('../config/global.functions.js');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
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
    })
        .then(() => {
            var result = {
                message: "Пользователь зарегистрирован"
            };
            globalFunctions.sendResult(res, result);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: "Неверно введенный логин и/или пароль" });
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Неверно введенный логин и/или пароль"
                });
                return;
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 28800
            });

            User.update({
                access_token: token,
            },
                {
                    where: {
                        id: user.id
                    }
                }
            ).then(object => {

                var object = {
                    id: user.id,
                    login: user.login,
                    is_admin: user.is_admin,
                    accessToken: token
                };

                globalFunctions.sendResult(res, object);

            }).catch(err => {
                globalFunctions.sendError(res, err);
            })


        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.refreshToken = (req, res) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            if (!user) {
                globalFunctions.sendError(res, "Неверно введенный логин и/или пароль");
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 3600 // 1 часо — время действия токена в секундах
            });
            var object = {
                id: user.id,
                login: user.login,
                is_admin: user.is_admin,
                accessToken: token
            };
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.logout = (req, res) => {

    User.findOne({
        where: {
            login: req.body.login
        }
    })
        .then(user => {
            User.update({
                access_token: null,
            },
                {
                    where: {
                        id: user.id
                    }
                }
            ).then(() => {
                globalFunctions.sendResult(res, "Успешный выход с аккаунта");
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.userBoard = (req, res) => {
    globalFunctions.sendResult(res, "Пользователь авторизован");
};