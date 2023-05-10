import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {Home} from "./Components/Home"
import {Contact} from "./Components/Contact"
import {Register} from "./Components/Register"
import {MyNavBar} from "./Components/MyNavBar";
// import BookList from "./Components/BookList";
import {BookList2} from "./Components/BookList2";
import {AddBook} from "./Components/AddBook";
import {AboutUs} from "./Components/AboutUs"
import React, {useState, createContext, useEffect} from "react";
import {Login} from "./Components/Login";

export const BookContext = createContext();

function App() {
    const [mylist, setList] = useState("");

    useEffect(()=>{
        getBooks();
    }, []);

    const getBooks = async () =>{
        const res = await fetch('http://localhost:8080/api/getBooks');
        const data = await res.json();
        setList(data);
    }

    if (mylist.length > 0) {
        return (
            <BookContext.Provider value={{list:mylist, setList:setList}}>
            <div className="App h-100">
                <div className="row h-25 bg-success">
                    <div className="row h-50">
                        <h1>My Book Store</h1>
                    </div>
                    <div className="row h-50">
                        <MyNavBar/>
                    </div>
                </div>
                <div className="row h-50 bg-warning">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>}/>

                            {/*You have to switch between these two lines for BookList and BookList2*/}
                            <Route path="Books" element={<BookList2/>}/>
                            {/*<Route path="Books" element={<BookList list={mylist}/>}/>*/}

                            <Route path="add" element={<AddBook/>}/>
                            <Route path="contact" element={<Contact/>}/>
                            <Route path="aboutus" element={<AboutUs/>}/>

                            <Route path="login" element={<Login/>}/>
                            <Route path="register" element={<Register/>}/>

                            <Route path="*" element={<Home/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
                <div className="row h-25 bg-warning">
                    <ul>
                        {mylist.map((book)=>{
                            return <li>{book.name}</li>;})}
                    </ul>
                </div>
            </div>
            </BookContext.Provider>
        )
    }
    else {
        return(
            <div>
                <h1>Books loading</h1>
            </div>
        )
    }
}

export default App;
