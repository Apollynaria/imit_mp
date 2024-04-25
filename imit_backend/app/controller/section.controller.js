var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Section = db.section;
var UserSection = db.user_section;
var User = db.user;
var { Op } = require("sequelize");


exports.findAll = (req, res) => {
    Section.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.create = async (section, conference_id, transaction) => {

    const newSection = await Section.create({
        conference_id: conference_id,
        name: section.name,
        description: section.description
    }, { transaction: transaction });

    // Создание пользователей секции
    await Promise.all(section.section_users.map(async (user) => {
        await UserSection.create({
            section_id: newSection.id,
            user_id: user.id,
        }, { transaction });
    }));

};

exports.getAllSectionsForConference = async (conferenceId) => {
    try {
        const sections = await Section.findAll({
            where: { conference_id: conferenceId },
            include: [{
                model: UserSection,
                required: true,
                include: [{
                    model: User,
                    attributes: ['name', 'surname', 'patronymic', 'email'],
                },
            ]
            }],
        });

        // console.log(sections);
        return sections;

    } catch (error) {
        console.error(error);
        return null;
    }
};

exports.getAllSectionsForConferenceRequest = async (conferenceId) => {
    try {
        const sections = await Section.findAll({
            where: { conference_id: conferenceId },
        });

        return sections;

    } catch (error) {
        console.error(error);
        return null;
    }
};

// exports.update = async (req, res) => {
//     var form = new multiparty.Form();
//     await form.parse(req, async (err, fields, files) => {
//         if (!err) {
//             var mimeType, link;
//             await Section.findByPk(fields.id[0])
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

//             Section.update({
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

// exports.delete = (req, res) => {
//     Section.findByPk(req.params.id)
//         .then(async (object) => {
//             // удаляем файл
//             if (object.path) {
//                 await fs.unlinkSync(object.dataValues.path);
//             }
//             await Section.destroy({
//                 where: {
//                     id: req.params.id
//                 }
//             }).then(() => {
//                 globalFunctions.sendResult(res, 'Запись удалена');
//             }).catch(err => {
//                 globalFunctions.sendError(res, err);
//             });
//         }).catch(err => {
//             globalFunctions.sendError(res, err);
//         });

// };

// exports.findById = (req, res) => {
//     Section.findByPk(req.params.id)
//         .then(object => {
//             globalFunctions.sendResult(res, object);
//         })
//         .catch(err => {
//             globalFunctions.sendError(res, err);
//         })
// };