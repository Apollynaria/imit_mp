var db = require('../config/db.config.js');
var User = db.user;

exports.checkDuplicateLogin = (req, res, next) => {
    User.findOne({
        where: {
            login: req.body.login
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Пользователь с данным логином существует"
            });
            return;
        }    
        next();
    });
};