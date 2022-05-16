const dbconfig = require("./connectionString");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = dbconfig.DB_URL;
db.contenus = require("./models/Contenus");
db.preferences = require("./models/Preference");
db.quizzs = require("./models/Quizzs");
db.cours = require("./models/Cours");
db.lessons = require("./models/Lessons");

module.exports = db;