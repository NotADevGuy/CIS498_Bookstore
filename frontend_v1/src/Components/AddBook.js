import React, {useEffect} from "react";
import {useState, useContext} from "react";
import {BookContext} from "../App";
import axios from "axios";
import {sendBook} from "../services/BookService";
import {Navigate} from "react-router-dom";

export function AddBook(){
    const [done, setDone] = useState(0);

    useEffect(()=>{}, [done])
    const {list, setList} = useContext(BookContext);


    const [bname, setName] = useState();
    const [bprice, setPrice] = useState();
    const [binfo, setInfo] = useState();
    const [bauthor, setAuthor] = useState();

    function addBook() {
        let book = {name:bname, author:bauthor, info:binfo, price:bprice}
        let list2 = [...list, book];
        setList(list2);
        // sendBook(book);
        saveBook(book)
        setDone(1);
    }

    const saveBook = async (book) => {
        const res = await fetch('http://localhost:3000/api/addBook',
            {
                method: 'POST',
                headers: {
                    'content-type':"application/JSON",
                },
                body: JSON.stringify(book)
            });
        const data = await res.json()
        console.log("Sent: ", data);
    }


    let admin = parseInt(sessionStorage.getItem("admin"));
    if (done===0) {
        return (
            <div>
                Book Name <input type="text" id="bname" onChange={(e)=>{setName(e.target.value)}}/> <br/>
                Book Author <input type="text" id="bauthor" onChange={(e)=>{setAuthor(e.target.value)}}/> <br/>
                Book Price <input type="text" id="bprice" onChange={(e)=>{setPrice(e.target.value)}}/> <br/>
                Book Info <input type="text" id="binfo" onChange={(e)=>{setInfo(e.target.value)}}/> <br/>
                <button type="button" onClick={addBook}>Add Book</button>
            </div>
        )
    }
    else {
        return(<Navigate to="/Books/"/>)
    }
}
