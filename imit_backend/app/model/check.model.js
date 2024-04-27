module.exports = (sequelize, Sequelize) => {
    var Check = sequelize.define(
        'check',
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
            message: {
                type: Sequelize.TEXT
            }
        });

    Check.associate = (models) => {

        Check.belongsTo(models.user_request, {
            foreignKey: 'request_id'
        });


    };
    return Check;
};