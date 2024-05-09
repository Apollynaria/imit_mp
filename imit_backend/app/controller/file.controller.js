var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var File = db.file;
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');
var { Op } = require("sequelize");

var mime_expansion = new Map();
mime_expansion
    .set("vnd.ms-powerpoint", "ppt")
    .set("vnd.openxmlformats-officedocument.presentationml.presentation", "pptx")
    .set("x-zip-compressed", "zip")
    .set("zip", "zip")
    .set("pdf", "pdf")
    .set("png", "png")
    .set("jpeg", "jpeg")
    .set("x-zip", "zip");

exports.findAll = (req, res) => {
    File.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.create = async (req, res, files, is_public, transaction) => {

    console.log(files)
    var mimeType, link;
    var mimeType = files.file[0].headers['content-type']; // тип файла указывается так: image/png

    var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение

    expansion = mime_expansion.get(expansion);
    var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
    link = './files/' + newName;

    fs.rename(files.file[0].path, link, (err) => {
        if (err) {
            throw err;
        }
    });

    const newFile = await File.create({
        path: link,
        mime_type: mimeType,
        is_public: is_public
    }, { transaction: transaction });

    return newFile.id;

};

exports.createManyFile = async (req, res, file, is_public, transaction) => {

    var mimeType, link;
    var mimeType = file.headers['content-type']; // тип файла указывается так: image/png

    var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение

    expansion = mime_expansion.get(expansion);
    var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
    link = './files/' + newName;

    fs.rename(file.path, link, (err) => {
        if (err) {
            throw err;
        }
    });

    const newFile = await File.create({
        path: link,
        mime_type: mimeType,
        is_public: is_public
    }, { transaction: transaction });

    return newFile.id;

};

// exports.update = async (req, res) => {
//     var form = new multiparty.Form();
//     await form.parse(req, async (err, fields, files) => {
//         if (!err) {
//             var mimeType, link;
//             await File.findByPk(fields.id[0])
//                 .then(object => {
//                     if (object.path) {
//                         fs.unlinkSync(object.path);
//                     }
//                 })
//                 .catch(err => {
//                     globalFunctions.sendError(res, err);
//                 })
//             mimeType = files.path[0].headers['content-type']; // тип файла указывается так: image/png

//             var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение
//             expansion = mime_expansion.get(expansion);

//             var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
//             link = './files/' + newName;

//             fs.rename(files.path[0].path, link, (err) => {
//                 if (err) {
//                     throw err;
//                 }
//             });

//             File.update({
//                 path: link,
//                 mime_type: mimeType
//             },
//                 {
//                     where: {
//                         id: fields.id[0]
//                     }
//                 }
//             ).then(object => {
//                 globalFunctions.sendResult(res, object);
//             }).catch(err => {
//                 globalFunctions.sendError(res, err);
//             })
//         } else {
//             globalFunctions.sendError(res, err);
//         }
//     });
// };

exports.delete = async (req, res, transaction) => {
    try {
        console.log(req.params.id)
        const object = await File.findByPk(req.params.id, { transaction });

        console.log('sdfsdf')
        console.log(object)
        if (object) {
            // удаляем файл
            if (object.path) {
                await fs.unlinkSync(object.dataValues.path);
            }

            await File.destroy({
                where: {
                    id: req.params.id
                },
                transaction // добавляем транзакцию в параметры запроса
            });

            // globalFunctions.sendResult(res, 'Запись удалена');
        } else {
            // globalFunctions.sendError(res, 'Файл не найден');
        }
    } catch (error) {
        // Если произошла ошибка
        // globalFunctions.sendError(res, error);
    }
};
