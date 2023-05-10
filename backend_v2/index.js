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

db.mongoose.connect(
    db.url, {useNewUrlParser:true, useUnifiedTopology:true}
).then( () =>
    {console.log("Database Connected.")}
).catch( () =>
    {console.log("Database not Connected.")}
);

app.get('/api/getBooks', (req, res) => {
    Book.find().then((data)=>{
        res.send(data);
    });
});

app.post('/api/addBook' , (req, res) => {
    const book = new Book({
        name: req.body.name,        info: req.body.info,
        author: req.body.author,    price: req.body.price
    })

    book.save().then(()=> {
        console.log(`\nAdded: ${book.name}`)
    })
})

app.post('/api/updateBook', (req, res) => {
    Book.findByIdAndUpdate(
        req.body._id,   req.body,   {new:true}
    )
        .then(()=>{console.log(`\nSave: ${req.body.name}`)})
        .catch((err)=>{console.log(err)})
})

app.post('/api/deleteBook', (req, res) => {
    var id = req.body._id;

    Book.findByIdAndDelete(id)
        .then(()=>{console.log("Removed book where ID == " + id)})
        .catch((err) => {console.log(err)})
    Book.find()
        .then((data)=>{res.send(data)})
        .catch((err)=>{console.log("Error: " + err)})
});

const User = require("./src/models/UserModel");

app.post('/api/login', async (req, res) => {
        const user = new User({
            username: req.body.username, password: req.body.password,
        })

        const uExist = await User.find({username: user.username})

        if (uExist.length === 1) {
            console.log(`\nLogin attempt for: ${user.username} with password: ${user.password}`)
            if (uExist[0].password === user.password) {
                console.log("Login successful for: " + user.username)
                return res.status(200).json({admin: uExist[0].admin})
            } else {
                console.log("Login failed for: " + user.username)
                return res.status(400).json({message: "Invalid password"})
            }
        } else {
            console.log("User " + user.username + "does not exist")
            return res.status(401).json({message: "User does not exist"})
        }
});

app.post('/api/register', async (req, res) => {
    const user = new User({
        username: req.body.username,    password: req.body.password,
        admin: req.body.admin,          zip: req.body.zip,
        email: req.body.email,          fname: req.body.fname,
        lname: req.body.lname
    })

    const uExist = await User.find({username: user.username})
    if (uExist.length > 0) {
        return res.status(400).send("User already exists")
    } else {
        user.save().then(() => {
            console.log("\nAdded: " + user.username)
        }).catch((err) => {
            console.log(err)
        })
        return res.status(200).send("User added")
    }
});

app.listen(8080, ()=>{console.log("Server started")})
