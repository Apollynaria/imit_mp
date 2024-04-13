var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var File = db.file;
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');
var { Op } = require("sequelize");

exports.findAll = (req, res) => {
    File.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.create = async (req, res) => {
    var form = new multiparty.Form();
    await form.parse(req, async (err, files) => {
        if (!err) {
            var mimeType, link;
            var mimeType = files.path[0].headers['content-type']; // тип файла указывается так: image/png

            var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение

            expansion = mime_expansion.get(expansion);
            var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
            link = './files/' + newName;

            fs.rename(files.path[0].path, link, (err) => {
                if (err) {
                    throw err;
                }
            });

            File.create({
                path: link,
                mime_type: mimeType,
            }).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        } else {
            globalFunctions.sendError(res, err);
        }
    });
};

exports.update = async (req, res) => {
    var form = new multiparty.Form();
    await form.parse(req, async (err, fields, files) => {
        if (!err) {
            var mimeType, link;
            await File.findByPk(fields.id[0])
                .then(object => {
                    if (object.path) {
                        fs.unlinkSync(object.path);
                    }
                })
                .catch(err => {
                    globalFunctions.sendError(res, err);
                })
            mimeType = files.path[0].headers['content-type']; // тип файла указывается так: image/png

            var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение
            expansion = mime_expansion.get(expansion);

            var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
            link = './files/' + newName;

            fs.rename(files.path[0].path, link, (err) => {
                if (err) {
                    throw err;
                }
            });

            File.update({
                path: link,
                mime_type: mimeType
            },
                {
                    where: {
                        id: fields.id[0]
                    }
                }
            ).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        } else {
            globalFunctions.sendError(res, err);
        }
    });
};

exports.delete = (req, res) => {
    File.findByPk(req.params.id)
        .then(async (object) => {
            // удаляем файл
            if (object.path) {
                await fs.unlinkSync(object.dataValues.path);
            }
            await File.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                globalFunctions.sendResult(res, 'Запись удалена');
            }).catch(err => {
                globalFunctions.sendError(res, err);
            });
        }).catch(err => {
            globalFunctions.sendError(res, err);
        });

};

exports.findById = (req, res) => {
    File.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};