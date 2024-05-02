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
            old_status: {
                type: Sequelize.ENUM('consideration', 'cancel', 'revision', 'approve', 'approve_after_revision', 'approve_another_section'),
                allowNull: false
            },
            new_status: {
                type: Sequelize.ENUM('consideration', 'cancel', 'revision', 'approve', 'approve_after_revision', 'approve_another_section'),
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