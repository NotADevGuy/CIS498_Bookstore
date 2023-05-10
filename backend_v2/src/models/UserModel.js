let mongoose = require("mongoose");

let schema = mongoose.Schema;
let User = new schema(
    {
        fname:String,       lname:String,
        email:String,       username:String,
        password:String,    admin:Boolean,
        zip:String
    },
    {timestamps:true}
);

const userModel = mongoose.model("users", User);

module.exports = userModel;
