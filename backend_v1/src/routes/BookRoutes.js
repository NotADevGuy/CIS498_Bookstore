const bookLib = require("../controllers/BookController");
module.exports = app => {
    const bookLib = require("../controllers/BookController");

    var router = require("express").Router();
    router.get("/getBooks", bookLib.getBooks);
    router.post("/addBook", bookLib.saveBook);
    router.post("/updateBook", bookLib.update);
    router.get("/delete", bookLib.removeBook);
    // router.get("/delete", bookLib.removeBook);
    app.use("/", router);
}