module.exports = (sequelize, Sequelize) => {
    var File = sequelize.define(
        'file',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            path: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            is_public: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            mime_type: {
                type: Sequelize.STRING(100),
                allowNull: true
            }
        });


    File.associate = (models) => {

        File.hasOne(models.conference, {
            foreignKey: 'schedule_file_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        File.hasOne(models.conference, {
            foreignKey: 'collection_file_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        File.hasOne(models.conference, {
            foreignKey: 'title_file_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        File.hasOne(models.user_request, {
            foreignKey: 'file_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

    };

    return File;
};