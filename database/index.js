const dbconfig = require("./connectionString");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.url = dbconfig.DB_URL;
db.contenus = require("./models/Contenus");

module.exports = db;