import React from "react";
import {Logout} from "./Logout";

export function MyNavBar() {
    let logged = parseInt(sessionStorage.getItem("login"));
    let admin = parseInt(sessionStorage.getItem("admin"));
    let username = sessionStorage.getItem("username");

    // console.log(logged, admin)
    if (logged !== 1) {
        logged = 0;
        admin = 0;
        username = "";
        // console.log("HERE")
    }

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <h4>Login = {logged} Admin = {admin}</h4>
                    <h4>Username = {username}</h4>
                    <a href="/Home" className="navbar-brand">MyBookStore</a>
                </div>

                <ul className="nav">
                    <li>
                        <a className="nav-link" href="/Books">Books</a>
                    </li>
                    <li>
                        {(admin===1)?(
                            <a className="nav-link" href="/add">Add Book</a>
                        ):""}
                    </li>
                    <li>
                        <a className="nav-link" href="/contact">Contact</a>
                    </li>
                    <li>
                        <a className="nav-link" href="/aboutus">About Us</a>
                    </li>
                </ul>

                {(logged===0)?(
                    <ul className="nav navbar-right">

                        <li>
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/register">Register</a>
                        </li>
                    </ul>
                ):(
                    <ul className="nav navbar-right">
                        <li>
                            <form onSubmit={Logout}>
                                <button type="submit">Logout</button>
                            </form>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}