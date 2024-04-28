var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Conference = db.conference;
var multiparty = require('multiparty');
var { Op } = require("sequelize");
const file = require('../controller/file.controller');
const File = db.file;
const AdminComm = db.admin_conference;
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


exports.findById = (req, res) => {
    Conference.findByPk(req.params.id, {
    })
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

                // Фото title_file
                const title_file = await File.findByPk(conference.title_file_id);

                // schedule_file, collection_file

                // Добавление данных к объекту conference
                conference.dataValues.sections = sections;
                conference.dataValues.org_comm = users_org_comm;
                conference.dataValues.progr_comm = users_progr_comm;
                conference.dataValues.title_file = title_file;

                globalFunctions.sendResult(res, conference);
            } catch (error) {
                globalFunctions.sendError(res, error);
            }
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.findByIdAdmin = (req, res) => {
    Conference.findByPk(req.params.id, {
        include: [{
            model: AdminComm,
            where: { user_id: req.userId },
            attributes: [],
        }]
    })
        .then(async conference => {
            if (!conference) {
                globalFunctions.sendError(res, 'Конференция не найдена | нет доступа');
                return;
            }
            try {
                // // Получение секций
                const sections = await section.getAllSectionsForConferenceChange(req.params.id);

                // // Орг комм
                const users_org_comm = await adminComm.getAllAdminUserForConferenceAdmin(req.params.id);

                // // Прогр комм
                const users_progr_comm = await progrComm.getAllProgrUserForConferenceAdmin(req.params.id);

                // Фото title_file, schedule_file, collection_file
                const title_file = await File.findByPk(conference.title_file_id);
                const schedule_file = await File.findByPk(conference.schedule_file);
                const collection_file = await File.findByPk(conference.collection_file);

                // Добавление данных к объекту conference
                conference.dataValues.sections = sections;
                conference.dataValues.org_comm = users_org_comm;
                conference.dataValues.progr_comm = users_progr_comm;
                conference.dataValues.title_file = title_file;
                conference.dataValues.schedule_file = schedule_file;
                conference.dataValues.collection_file = collection_file;

                globalFunctions.sendResult(res, conference);
            } catch (error) {
                globalFunctions.sendError(res, error);
            }
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};

exports.findAllForAdmin = async (req, res) => {
    try {
        const conferences = await Conference.findAll({
            attributes: ['id', 'name', 'short_description', 'date_begin', 'date_end', 'date_for_request_begin', 'date_for_request_end', 'location', 'title_file_id'],
            include: [
                {
                    model: AdminComm,
                    where: { user_id: req.userId },
                },
            ],

        });

        // Fetch title_file for each conference (same as before)
        for (const conference of conferences) {
            const title_file = await File.findByPk(conference.title_file_id);
            conference.dataValues.title_file = title_file;
        }

        globalFunctions.sendResult(res, conferences);
    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};

exports.findAllForRequest = async (req, res) => {
    try {
        const conferences = await Conference.findAll({
            attributes: ['id', 'name', 'short_description', 'date_begin', 'date_end', 'date_for_request_begin', 'date_for_request_end', 'location', 'title_file_id'], // Include title_file_id
            where: {
                date_for_request_begin: { [Op.lte]: new Date() },
                date_for_request_end: { [Op.gte]: new Date() }
            }
        });

        // Fetch title_file for each conference
        for (const conference of conferences) {
            const title_file = await File.findByPk(conference.title_file_id);
            conference.dataValues.title_file = title_file;
        }

        globalFunctions.sendResult(res, conferences);
    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};

exports.findAllSortByDateBegin = async (req, res) => {
    try {
        const conferences = await Conference.findAll({
            attributes: ['id', 'name', 'short_description', 'date_begin', 'date_end', 'date_for_request_begin', 'date_for_request_end', 'location', 'title_file_id'],
            // where: {
            //     date_begin: { [Op.gte]: new Date() }
            // },
            order: [
                ['date_begin', 'ASC']
            ]
        });

        for (const conference of conferences) {
            const title_file = await File.findByPk(conference.title_file_id);
            conference.dataValues.title_file = title_file;
        }

        globalFunctions.sendResult(res, conferences);
    } catch (err) {
        console.log(err)
        globalFunctions.sendError(res, err);
    }
};

exports.findByIdForRequest = (req, res) => {
    Conference.findByPk(req.params.id, {
        attributes: ['name', 'date_begin', 'date_end', 'date_for_request_begin', 'date_for_request_end']
    })
        .then(async conference => {
            if (!conference) {
                globalFunctions.sendError(res, 'Конференция не найдена');
                return;
            }
            try {
                // Получение секций
                const sections = await section.getAllSectionsForConferenceRequest(req.params.id);

                // Добавление данных к объекту conference
                conference.dataValues.sections = sections;

                globalFunctions.sendResult(res, conference);
            } catch (error) {
                globalFunctions.sendError(res, error);
            }
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};