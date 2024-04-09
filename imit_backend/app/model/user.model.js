module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            login: {
                type: Sequelize.STRING(50),  // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(50),
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
                type: Sequelize.STRING(50),
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
    };
    return User;
};