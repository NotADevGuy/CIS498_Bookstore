const Book = require("../models/BookModel");

exports.getBooks = (req, res) => {
    Book.find().then((data)=>{
        // console.log(data);
        res.send(data);
    });
}

exports.saveBook = (req, res) => {
    const book = new Book({
        name: req.body.name,
        info: req.body.info,
        author: req.body.author,
        price: req.body.price
    });
    book.save().then(()=>{console.log("SAVED")}).catch();

}

exports.update = async(req, res) => {
    console.log("ID -->" + req.body._id);
    Book.findByIdAndUpdate(
        req.body._id,
        req.body,
        {new:true}
    );
}

exports.removeBook = async(req, res) => {
    console.log("ID -->" + req.body._id);
    console.log("ID -->" + req.body.id);
    console.log("ID -->" + req.query._id);
    var id = req.query._id;
    console.log("ID -->" + id);
    await Book.findByIdAndDelete(id)
        .then(()=>{console.log("Removed: " + id)})
        .catch((err) => {console.log(err)})
    Book.find()
        .then((data)=>{res.send(data)})
        .catch((err)=>{console.log("Error --> " + err)} )
}
