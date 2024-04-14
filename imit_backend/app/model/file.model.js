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
            mime_type: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            is_public: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        });

    return File;
};