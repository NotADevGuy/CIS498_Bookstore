const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.url = "mongodb://127.0.0.1:27017/mybooks";
db.books = require("./BookModel");

module.exports = db;
