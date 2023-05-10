const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.url = "mongodb://127.0.0.1:27017/mybooks";
// db.url = "mongodb+srv://matttbailey13mongo:XoO7ZfdTs34gHe6b@cluster0.juxzjto.mongodb.net/mybooks";

db.users = require("./UserModel");
db.books = require("./BookModel");

module.exports = db;
