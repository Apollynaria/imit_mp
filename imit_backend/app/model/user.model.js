module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true, 
                primaryKey: true,
                allowNull: false
            },
            login: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            surname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            patronymic: {
                type: Sequelize.STRING(50),
            },
            place_of_work: {
                type: Sequelize.STRING(150),
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },

        });
 
    User.associate = (models) => {
        User.hasMany(models.admin_conference, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        User.hasMany(models.program_user_conference, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        User.hasMany(models.user_section, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        User.hasMany(models.user_request, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return User;
};