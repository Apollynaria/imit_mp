var db = require('../config/db.config.js');
const globalFunctions = require('../config/global.functions.js');
var Schedule = db.schedule;
var { Op } = require("sequelize");
const Section = db.section;
const UserRequest = db.user_request;

exports.create = async (req, res) => {
    console.log(req.body);
    const transaction = await db.sequelize.transaction();

    try {
        const sections = req.body.sections;
        for (const section of sections) {
            for (const request of section.user_requests) {
                console.log(request);
                const existingSchedule = await Schedule.findOne({
                    where: { request_id: request.id },
                    transaction
                });
                if (existingSchedule) {
                    if (existingSchedule.order !== request.order || existingSchedule.time !== request.time) {
                        await existingSchedule.update({
                            order: request.schedule.order,
                            time: request.schedule.time
                        }, { transaction });
                    }
                } else {
                    await Schedule.create({
                        request_id: request.id,
                        order: request.schedule.order,
                        time: request.schedule.time
                    }, { transaction });
                }
            }
        }
        await transaction.commit();
        globalFunctions.sendResult(res, 'Расписание успешно добавлено!');
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        globalFunctions.sendError(res, err);
    }
};