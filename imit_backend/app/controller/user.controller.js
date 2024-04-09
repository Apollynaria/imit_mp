var db = require('../config/db.config.js');
var User = db.user;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    User.findAll()
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
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        place_of_work: req.body.place_of_work,
        email: req.body.email,
        phone: req.body.phone,
        is_admin: req.body.is_admin,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    User.update({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        place_of_work: req.body.place_of_work,
        email: req.body.email,
        phone: req.body.phone,
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
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findBySurname = (req, res) => {
    User.findAll({
        where: {
            surname: req.params.surname
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};