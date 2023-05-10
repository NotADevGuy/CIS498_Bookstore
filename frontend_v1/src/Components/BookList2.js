import React, {useState, useContext} from "react";
import {BookContext} from "../App";
import {removeBook, update} from "../services/BookService";

export function BookList2() {
    const {list, setList} = useContext(BookContext);
    let [bid, setId] = useState(0);
    const [currentBook, setBook] = useState(list[0]);

    const [bname, setName] = useState(currentBook.name);
    const [binfo, setInfo] = useState(currentBook.info);
    const [bauthor, setAuthor] = useState(currentBook.author);
    const [bprice, setPrice] = useState(currentBook.price);

    const setCurrentBook = (e) => {
        setId(e.target.value);
        let book = list[e.target.value];

        setName(book.name);
        setInfo(book.info);
        setAuthor(book.author);
        setPrice(book.price);
        setBook(book);
    }


    const updateBook = () => {
        var myBook = currentBook;
        myBook.name = bname;
        myBook.author = bauthor;
        myBook.info = binfo;
        myBook.price = bprice;
        setBook(myBook);
        var mylist = [...list];
        mylist[bid] = myBook;
        setList(mylist);
        update(myBook);
    }

    const saveBook = () => {
        // updateBook(currentBook);
        let myBook = list[bid];

        myBook.name = bname;
        myBook.author = bauthor;
        myBook.info = binfo;
        myBook.price = bprice;

        setBook(myBook);

        let mylist = [...list];

        mylist[bid] = myBook;
        setBook(myBook);
        setList(mylist);
    }

    const delBook = () => {
        if (list.length !== 1) {
            removeBook(currentBook)
            const newList = list.filter((item, index) => index!==bid);

            setList(newList);

            if (bid === 0){
                // console.log("INDEX 0")
                bid = 0;
                setId(bid)
            }
            else {
                bid = bid - 1;
                setId(bid);
                // console.log("OKA")
            }

            var book = newList[bid];

            setName(book.name);
            setAuthor(book.author);
            setInfo(book.info);
            setPrice(book.price);

            setBook(book);
        }
        else {
            alert("You cannot delete the last book");
        }
    }

    return (
        <div className="row h-100">
            <div className="col-6">
                <ul>
                    {list.map((book, index) => {
                        return <li key={index} value={index} onClick={setCurrentBook}>
                            {book.name}
                        </li>
                    })}
                </ul>
            </div>
            <div className="col-6">
                Book Name <input id="bname" onChange={(e)=>{setName(e.target.value)}} value={bname || ""}/><br/>
                Book Author <input id="bauthor" onChange={(e)=>{setAuthor(e.target.value)}} value={bauthor || ""}/><br/>
                Book Info <input id="binfo" onChange={(e)=>{setInfo(e.target.value)}} value={binfo || ""}/><br/>
                Book Price <input id="bprice" onChange={(e)=>{setPrice(e.target.value)}} value={bprice || ""}/><br/>
                <button type="button" onClick={updateBook}>SAVE BOOK</button>
                <button type="button" onClick={delBook}>DELETE BOOK</button>

            </div>
        </div>
    );
}
