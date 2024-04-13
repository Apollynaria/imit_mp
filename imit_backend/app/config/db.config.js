var dbProperties = {
    database: 'imit_mp', 
    username: 'root',
    password: '',
    host: 'localhost', 
    dialect: 'mysql', 
    pool: { 
        max: 5, 
        min: 0, 
        acquire: 30000, 
        idle: 10000
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, dbProperties.username, dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        operatorsAliases: false,
        pool: {
            max: dbProperties.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе
            freezeTableName: true,

            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false
        },
        dialectOptions: {
            useUTC: false,
            timezone: "+08:00"
        },
        timezone: "+08:00"
    }
);

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Подключение моделей
db.admin_conference = require('../model/admin_conference.model.js')(sequelize, Sequelize);
db.check = require('../model/check.model.js')(sequelize, Sequelize);
db.conference = require('../model/conference.model.js')(sequelize, Sequelize);
db.program_user_conference = require('../model/program_user_conference.model.js')(sequelize, Sequelize);
db.file = require('../model/file.model.js')(sequelize, Sequelize);
db.section = require('../model/section.model.js')(sequelize, Sequelize);
db.user_request = require('../model/user_request.model.js')(sequelize, Sequelize);
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.user_section = require('../model/user_section.model.js')(sequelize, Sequelize);


// Связывание моделей без импорта файлов (то есть, чтобы в файле описания любой модели можно было
// обращаться к другим моделям по имени без необходимости импорта в виде require(...))
Object.keys(db).forEach(key => {
    if (db[key] && db[key].associate) {
        db[key].associate(db);
    }
});

module.exports = db;