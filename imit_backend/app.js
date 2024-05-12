var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js');

app.use(express.static("files"));
// db.sequelize.sync({force: true}); //Пересоздание
db.sequelize.sync({alter: true}); //Обновление моделей

app.listen(3000);

var cors = require('cors');
var corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

var user = require('./app/route/user.route.js');
user(app);

var conference = require('./app/route/conference.route.js');
conference(app);

var user_request = require('./app/route/user_request.route.js');
user_request(app);

var file = require('./app/route/file.route.js');
file(app);

var check = require('./app/route/check.route.js');
check(app);

var section = require('./app/route/section.route.js');
section(app);

var auth = require('./app/route/auth.route.js');
auth(app);

var schedule = require('./app/route/schedule.route.js');
schedule(app);