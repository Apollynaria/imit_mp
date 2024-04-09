module.exports = (sequelize, Sequelize) => {
    var AdminConference = sequelize.define(
        'admin_conference',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            conference_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM('main', 'secondary') // ответственный или заместитель
            }
        });

    AdminConference.associate = (models) => {
        AdminConference.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        AdminConference.belongsTo(models.conference, {
            foreignKey: 'conference_id'
        });

    };
    return AdminConference;
};