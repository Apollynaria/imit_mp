module.exports = (sequelize, Sequelize) => {
    var Section = sequelize.define(
        'section',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            conference_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
        });

    Section.associate = (models) => {

        Section.hasMany(models.user_section, {
            foreignKey: 'section_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        Section.hasMany(models.user_request, {
            foreignKey: 'section_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        Section.belongsTo(models.conference, {
            foreignKey: 'conference_id'
        });

    };
    return Section;
};