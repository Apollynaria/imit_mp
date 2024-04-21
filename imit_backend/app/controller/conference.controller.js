var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Conference = db.conference;
var multiparty = require('multiparty');
var { Op } = require("sequelize");
const file = require('../controller/file.controller');
const section = require('../controller/section.controller');
const progrComm = require('../controller/progr_comm.controller.js');
const adminComm = require('../controller/admin_comm.controller.js');


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
    var form = new multiparty.Form();
    await form.parse(req, async (err, fields, files) => {
        if (!err) {
            // Начало транзакции
            const transaction = await db.sequelize.transaction();
            try {
                console.log(fields)
                // Создание файла и получение его ID
                let fileId = null;
                if (files.file) {
                    fileId = await file.create(req, res, files, true, transaction);
                }

                // Создание конференции с передачей транзакции
                const conference = await Conference.create({
                    name: fields.name[0],
                    short_description: fields.short_description[0],
                    date_begin: fields.date_begin[0],
                    date_end: fields.date_end[0],
                    date_for_request_begin: fields.date_for_request_begin[0],
                    date_for_request_end: fields.date_for_request_end[0],
                    // schedule_file_id: null,
                    full_description: fields.full_description[0],
                    location: fields.location[0],
                    // collection_file_id: null,
                    // result_text: fields.result_text[0],
                    title_file_id: fileId,

                }, { transaction });

                // Создание секций
                const sections = JSON.parse(fields.sections[0]);
                const createSections = await Promise.all(sections.map(async (sectionData) => {
                    const newSection = await section.create(sectionData, conference.id, transaction);
                    return newSection;
                }));

                // Создание организационного коммитета
                const org_comm = JSON.parse(fields.org_comm[0]);
                const createOrgComm = await Promise.all(org_comm.map(async (user) => {
                    const newUserFromOrgComm = await adminComm.create(user, conference.id, transaction);
                    return newUserFromOrgComm;
                }));

                // Создание программного коммитета
                const progr_comm = JSON.parse(fields.progr_comm[0]);
                const createProgrComm = await Promise.all(progr_comm.map(async (user) => {
                    const newUserFromProgrComm = await progrComm.create(user, conference.id, transaction);
                    return newUserFromProgrComm;
                }));

                // Коммит транзакции
                await transaction.commit();
                globalFunctions.sendResultWithId(res, 'Конференция успешно создана', conference.id);

            } catch (error) {
                console.log(error)
                await transaction.rollback();
                globalFunctions.sendError(res, error);
            }
        }
    });
}

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
        .then(async conference => {
            if (!conference) {
                globalFunctions.sendError(res, 'Конференция не найдена');
                return;
            }

            try {
                // Получение секций
                const sections = await section.getAllSectionsForConference(req.params.id);

                // Орг комм
                const users_org_comm = await adminComm.getAllAdminUserForConference(req.params.id);

                // Прогр комм
                const users_progr_comm = await progrComm.getAllProgrUserForConference(req.params.id);

                // Фото title_file, schedule_file, collection_file

                // Добавление данных о секциях к объекту conference
                conference.dataValues.sections = sections;
                conference.dataValues.org_comm = users_org_comm;
                conference.dataValues.progr_comm = users_progr_comm;

                globalFunctions.sendResult(res, conference);
            } catch (error) {
                globalFunctions.sendError(res, error);
            }
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};