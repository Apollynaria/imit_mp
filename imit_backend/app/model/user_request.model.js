module.exports = (sequelize, Sequelize) => {
    var UserRequest = sequelize.define(
        'user_request',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            status: {
                // «рассмотрение», «отмена», «пересмотр», «утвердить», «утвердить после пересмотра», «утвердить другой раздел»)
                type: Sequelize.ENUM('consideration', 'cancel', 'revision', 'approve', 'approve_after_revision', 'approve_another_section'),
                allowNull: false
            },
            comment: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(200),
            },
            user_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            conference_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            section_id: {
                type: Sequelize.INTEGER(10)
            },
            file_id: {
                type: Sequelize.INTEGER(10)
            }
        });

    UserRequest.associate = (models) => {
        
        UserRequest.hasMany(models.check, {
            foreignKey: 'request_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        UserRequest.hasOne(models.schedule, {
            foreignKey: 'request_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        UserRequest.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        UserRequest.belongsTo(models.conference, {
            foreignKey: 'conference_id'
        });

        UserRequest.belongsTo(models.section, {
            foreignKey: 'section_id'
        });

        UserRequest.belongsTo(models.file, {
            foreignKey: 'file_id'
        });

    };
    return UserRequest;
};