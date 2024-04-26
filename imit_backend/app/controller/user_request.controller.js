var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var UserRequest = db.user_request;
var multiparty = require('multiparty');
var { Op } = require("sequelize");
const file = require('../controller/file.controller');
const File = db.file;
const Section = db.section;
const User = db.user;
const Conference = db.conference;
const AdminConference = db.admin_conference


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

                const conference = await Conference.findByPk(fields.conference_id[0], { transaction });
                if (!conference) {
                    throw new Error('Конференция не найдена');
                }

                const section = await Section.findOne({
                    where: {
                        id: fields.section_id[0],
                        conference_id: fields.conference_id[0]
                    },
                    transaction
                });
                if (!section) {
                    throw new Error('Секция не найдена!');
                }

                // Создание заявки с передачей транзакции
                const user_request = await UserRequest.create({
                    status: 'consideration',
                    name: fields.name[0],
                    comment: fields.comment[0],

                    user_id: req.userId,
                    conference_id: fields.conference_id[0],
                    section_id: fields.section_id[0],

                    file_id: fileId,
                }, { transaction });

                // Коммит транзакции
                await transaction.commit();
                globalFunctions.sendResultWithId(res, 'Заявка успешно создана!', user_request.id);

            } catch (error) {
                console.log(error)
                await transaction.rollback();
                globalFunctions.sendError(res, error);
            }
        }
    });
}


exports.findAllUserRequests = async (req, res) => {
    try {
        const userRequests = await UserRequest.findAll({
            where: {
                user_id: req.userId
            },
            attributes: ['id', 'name', 'status'],
            include: [
                {
                    model: Conference,
                    attributes: ['name', 'date_begin', 'date_end', 'date_for_request_begin', 'date_for_request_end']
                },
                {
                    model: Section,
                    attributes: ['name']
                }
            ],
            order: [
                [Conference, 'date_begin', 'DESC']
            ]
        });
        globalFunctions.sendResult(res, userRequests);
    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};

exports.findAllRequestsForAdmin = async (req, res) => {
    try {
        const conferences = await AdminConference.findAll({
            where: {
                user_id: req.userId
            },
            attributes: ['conference_id'] 
        });

        const conferenceIds = conferences.map(conference => conference.conference_id);

        const requests = await UserRequest.findAll({
            where: {
                conference_id: { [Op.in]: conferenceIds }
            },
            include: [
                {
                    model: Conference,
                    attributes: ['name']
                },
                {
                    model: User,
                    attributes: ['name', 'surname', 'patronymic']
                }
            ],
            order: [
                ['status', 'DESC']
            ]
        });
       

        globalFunctions.sendResult(res, requests);
    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};

exports.findById = (req, res) => {
    UserRequest.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};