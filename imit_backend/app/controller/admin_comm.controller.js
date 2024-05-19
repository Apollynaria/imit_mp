var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var AdminUser = db.admin_conference;
var User = db.user;
var Conference = db.conference;
var { Op } = require("sequelize");

exports.create = async (user, conference_id, transaction) => {

    const newUser = await AdminUser.create({
        conference_id: conference_id,
        user_id: user.id,
        type: user.type === 'Председатель' ? 'main' : 'secondary'
    }, { transaction: transaction });

    return newUser;

};

exports.findUserForConference = async (conferenceId) => {
    try {
        const adminUsers = await AdminUser.findAll({
            where: {
                id: conferenceId
            },
            include: [
                { model: User } // Модель User из ассоциации
            ]
        });

        return adminUsers;
    } catch (error) {
        throw error;
    }
};

exports.checkAdminUserExistence = async (conferenceId, userId) => {
    try {
        const adminUser = await AdminUser.findOne({
            where: {
                conference_id: conferenceId,
                user_id: userId
            }
        });
        return adminUser !== null;
    } catch (error) {
        return error;
    }
};

exports.getAllAdminUserForConferenceAdmin = async (conferenceId) => {
    try {
        const users = await AdminUser.findAll({
            where: { conference_id: conferenceId },
            include: [
                {
                    model: User,
                    required: true,
                    attributes: ['name', 'surname', 'patronymic', 'id'],
                },
            ]
        });
        return users;
    } catch (error) {
        console.error(error);
        return null;
    }
};

exports.getAllAdminUserForConference = async (conferenceId) => {
    try {
        const users = await AdminUser.findAll({
            where: { conference_id: conferenceId },
            include: [
                {
                    model: User,
                    attributes: ['name', 'surname', 'patronymic', 'email'],
                    required: true,
                },
            ],
            order: [['type', 'asc']]
        });
        return users;
    } catch (error) {
        console.error(error);
        return null;
    }
};