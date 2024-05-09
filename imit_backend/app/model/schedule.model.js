module.exports = (sequelize, Sequelize) => {
    var Schedule = sequelize.define(
        'schedule',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            request_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            order: {
                type: Sequelize.INTEGER(100),
                allowNull: false
            },
            time: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
        });

    Schedule.associate = (models) => {

        Schedule.belongsTo(models.user_request, {
            foreignKey: 'request_id'
        });

    };
    return Schedule;
};