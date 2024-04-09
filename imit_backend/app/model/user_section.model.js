module.exports = (sequelize, Sequelize) => {
    var UserSection = sequelize.define(
        'user_section',
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
            section_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    UserSection.associate = (models) => {
        UserSection.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        UserSection.belongsTo(models.section, {
            foreignKey: 'section_id'
        });

    };
    return UserSection;
};