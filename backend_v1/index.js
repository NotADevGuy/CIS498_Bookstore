const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const corsOptions = {origin:"http://localhost:3000"};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));

const Book = require("./src/models/BookModel");
const db = require("./src/models/dbinfo");

require("./src/routes/BookRoutes")(app)

db.mongoose.connect(
   db.url, {useNewUrlParser:true, useUnifiedTopology:true}
).then(
    ()=>{
        console.log("Database Connected.")
    }
).catch(
    ()=>{
        console.log("Database not Connected.")
    }
);

app.listen(8080, ()=>{console.log("Server started")})
