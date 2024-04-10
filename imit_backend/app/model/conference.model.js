module.exports = (sequelize, Sequelize) => {
    var Conference = sequelize.define(
        'conference',
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            short_description: {
                type: Sequelize.STRING(100), 
                allowNull: false
            },
            full_description: {
                type: Sequelize.STRING, 
                allowNull: false
            },
            date_begin: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            date_end: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            date_for_request_begin: {
                type: Sequelize.STRING(10),
            },
            date_for_request_end: {
                type: Sequelize.STRING(10),
            },
            date_for_tesis_begin: {
                type: Sequelize.STRING(10),
            },
            date_for_tesis_end: {
                type: Sequelize.STRING(10),
            },
            location: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

        });

    Conference.associate = (models) => {
        Conference.hasMany(models.admin_conference, {
            foreignKey: 'conference_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        Conference.hasMany(models.program_user_conference, {
            foreignKey: 'conference_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        Conference.hasMany(models.section, {
            foreignKey: 'conference_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Conference;
};