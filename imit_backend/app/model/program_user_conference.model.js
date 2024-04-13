module.exports = (sequelize, Sequelize) => {
    var ProgramUserConference = sequelize.define(
        'program_user_conference',
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

    ProgramUserConference.associate = (models) => {
        
        ProgramUserConference.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        ProgramUserConference.belongsTo(models.conference, {
            foreignKey: 'conference_id'
        });

    };
    return ProgramUserConference;
};