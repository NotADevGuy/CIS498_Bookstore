import { useState } from 'react';
import {useNavigate} from "react-router-dom";

export function Login() {
    const [inputs, setInputs] = useState({});
    const [isChecked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        let res, isAdmin =  login(inputs.user, inputs.pass, isChecked)
        // alert("HEY") // This may be needed to slow down program.
        navigate("/NavBar");
        window.location.reload();
    }

    const login = async (username, password) => {
        const res = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // withCredentials: true, // Check this out...
            body: JSON.stringify({username: username, password: password})
        })
        const data = await res.json() // This may need to be async or not, probably async tho.

        if (res.ok) {
            alert("Login successful!")
            sessionStorage.setItem("login", 1);
            data.admin ? sessionStorage.setItem("admin", 1) : sessionStorage.setItem("admin", 0)

            sessionStorage.setItem("username", username)
            return true
        }
        else {
            alert(`Error: ${res.status} | ${res.statusText}`)
            return false
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <h1>Login</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="usernameValue">User Name</label>
                </div>
                <div className="col">
                    <input pattern="^[A-Za-z][A-Za-z0-9_]{7,29}$" required="Required"
                           className="form-control" type="text" name="user" id="usernameValue" onChange={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="passwordValue">Password</label>
                </div>
                <div className="col">
                    <input pattern="^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$" required="Required"
                           className="form-control" type="password" name="pass" id="passwordValue" onChange={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </div>
        </form>
    )
}