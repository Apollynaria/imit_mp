var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Conference = db.conference;
var multiparty = require('multiparty');
var fs = require('fs');
var uuid = require('uuid');
var { Op } = require("sequelize");
var moment = require('moment');

exports.findAll = (req, res) => {
    Conference.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.time = (req, res) => {
    db.sequelize.query(
        `SELECT NOW() as dateServ`,
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

exports.findAllSorted = (req, res) => {
    db.sequelize.query(
        `SELECT * 
        FROM conference
        ORDER BY conference.date_begin DESC`,
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

exports.create = async (req, res) => {

    Conference.create({
        name: fields.name[0],
        short_description: field.short_description[0],
        date_begin: fields.date_begin[0],
        date_end: fields.date_end[0],
        date_for_request_begin: fields.date_for_request_begin[0],
        date_for_request_end: fields.date_for_request_end[0],
        // schedule_file_id: null,
        full_description: fields.full_description[0],
        location: fields.location[0],
        // collection_file_id: null,
        // result_text: fields.result_text[0],
        title_file_id: null,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })


    // var form = new multiparty.Form();
    // await form.parse(req, async (err, fields, files) => {
    //     if (!err) {
    //         var mimeType, link;
    //         if (fields.fileIsUpload[0] == 1) {
    //             var mimeType = files.file[0].headers['content-type']; // тип файла указывается так: image/png

    //             var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение

    //             expansion = mime_expansion.get(expansion);
    //             var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
    //             link = './files/' + newName;

    //             fs.rename(files.file[0].path, link, (err) => {
    //                 if (err) {
    //                     throw err;
    //                 }
    //             });
    //         } else {
    //             link = "";
    //             mimeType = "";
    //         }

    //         Conference.create({
    //             name: fields.name[0],
    //             file: link,
    //             mime_type: mimeType,
    //             description: fields.description[0],
    //             date: fields.date[0],
    //             place: fields.place[0]
    //         }).then(object => {
    //             globalFunctions.sendResult(res, object);
    //         }).catch(err => {
    //             globalFunctions.sendError(res, err);
    //         })
    //     } else {
    //         globalFunctions.sendError(res, err);
    //     }
    // });
};

// exports.update = async (req, res) => {
//     var form = new multiparty.Form();
//     await form.parse(req, async (err, fields, files) => {
//         if (!err) {
//             var mimeType, link;
//             if (fields.fileIsUpload[0] == 1) {
//                 await Presentation.findByPk(fields.id[0])
//                     .then(object => {
//                         if (object.file) {
//                             fs.unlinkSync(object.file);
//                         }
//                     })
//                     .catch(err => {
//                         globalFunctions.sendError(res, err);
//                     })
//                 mimeType = files.file[0].headers['content-type']; // тип файла указывается так: image/png
//                 // console.log(files.file[0]);

//                 var expansion = mimeType.split('/')[1]; // из "image/png" нужно извлечь только расширение
//                 expansion = mime_expansion.get(expansion);

//                 var newName = uuid.v4() + "." + expansion; // вызываем функцию v4() для того, чтобы уникальный идентификатор был сгенерирован случайным образом
//                 link = './files/' + newName;

//                 fs.rename(files.file[0].path, link, (err) => {
//                     if (err) {
//                         throw err;
//                     }
//                 });
//             } else {
//                 mimeType = fields.mime_type[0];
//                 link = fields.trueFile[0];
//             }
//             Presentation.update({
//                 name: fields.name[0],
//                 file: link,
//                 mime_type: mimeType,
//                 description: fields.description[0],
//                 date: fields.date[0],
//                 place: fields.place[0]
//             },
//                 {
//                     where: {
//                         id: fields.id[0]
//                     }
//                 }
//             ).then(object => {
//                 console.log(1);
//                 globalFunctions.sendResult(res, object);
//             }).catch(err => {
//                 console.log(2);
//                 //globalFunctions.sendError(res, err);
//             })
//         } else {
//             globalFunctions.sendError(res, err);
//         }
//     });
// };

exports.delete = (req, res) => {
    Conference.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });

};

exports.get5ConferencesSortByData = (req, res) => {
    db.sequelize.query(
        `SELECT * 
        FROM conference 
        WHERE conference.date_begin >= NOW() 
        ORDER BY conference.date_begin 
        LIMIT 5 `,
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

exports.findByName = (req, res) => {
    Conference.findAll({
        where: {
            name: { [Op.like]: `%${req.params.name}%` }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// exports.findByDateBegin = (req, res) => {
//     moment.createFromInputFallback = function (config) {
//         config._d = new Date(config._i);
//     };
//     var startDate = moment(req.params.date).startOf("day").toDate();
//     var endDate = moment(req.params.date).endOf("day").toDate();
//     Presentation.findAll({
//         where: {
//             date: {
//                 [Op.between]: [startDate, endDate]
//             }
//         }
//     }).then(objects => {
//         globalFunctions.sendResult(res, objects);
//     }).catch(err => {
//         globalFunctions.sendError(res, err);
//     })
// };

exports.findById = (req, res) => {
    Conference.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};