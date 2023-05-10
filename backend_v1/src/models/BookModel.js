let mongoose = require("mongoose");

let schema = mongoose.Schema;
let Book = new schema(
    {
        name:String,
        info:String,
        author:String,
        price:String
    },
    {
        timestamps:true
    });

const bookModel = mongoose.model("books", Book);

module.exports = bookModel;

