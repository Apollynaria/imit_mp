var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Check = db.check;
var { Op } = require("sequelize");
const Section = db.section;
const UserRequest = db.user_request;

exports.create = async (req, res) => {
    console.log(req.body);
    const transaction = await db.sequelize.transaction();
    try {
        const check = await Check.create({
            request_id: req.body.request_id,
            message: req.body.message,
        }, { transaction });

        if (req.body.newStatus) {
            await UserRequest.update({
                status: req.body.newStatus.status
            }, {
                where: { id: req.body.request_id },
                transaction
            });
        }

        if (req.body.newSection) {
            await UserRequest.update({
                section_id: req.body.newSection.id
            }, {
                where: { id: req.body.request_id },
                transaction
            });
        }

        await transaction.commit();
        globalFunctions.sendResult(res, 'Заявка изменена успешно!');
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        globalFunctions.sendError(res, err);
    }
};