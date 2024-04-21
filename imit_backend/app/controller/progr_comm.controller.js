var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var ProgrUser = db.program_user_conference;
var User = db.user;
var { Op } = require("sequelize");

exports.create = async (user, conference_id, transaction) => {

    const newUser = await ProgrUser.create({
        conference_id: conference_id,
        user_id: user.id,
        type: user.type === 'Председатель'? 'main' : 'secondary'
    }, { transaction: transaction });

    return newUser;

};

exports.getAllProgrUserForConference = async (conferenceId) => {
    try {
        const users = await ProgrUser.findAll({
            where: { conference_id: conferenceId },
            include: [
                {
                    model: User,
                    required: true,
                },
            ]
        });

        return users;

    } catch (error) {
        console.error(error);
        return null;
    }
};
