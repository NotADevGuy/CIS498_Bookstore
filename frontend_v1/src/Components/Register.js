import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Register() {
    const [inputs, setInputs] = useState({});
    const [isChecked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        // sessionStorage.setItem("login", 1);
        // isChecked ? sessionStorage.setItem("admin", 1) : sessionStorage.setItem("admin", 0)
        let reg = register()

        navigate("/NavBar");
        window.location.reload();
    }

    const register = async () => {
        const res = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname: inputs.fname,        lname: inputs.lname,
                email: inputs.email,        username: inputs.user,
                password: inputs.pass,      admin: isChecked,
                zip: inputs.zip
            })
        })
        const data = await res.json()

        if (res.status === 200) {
            alert("Thank you for joining us!")
        }
        else if (res.status === 400) {
            alert("Username already exists")
        }
    }

    const handleCheck = () => {
        setChecked(!isChecked)
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <h1>Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="firstName">First Name</label>
                </div>
                <div className="col">
                    <input required="Required"
                           className="form-control" type="text"
                           name="fname" id="firstName"
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="lastName">Last Name</label>
                </div>
                <div className="col">
                    <input required="Required"
                           className="form-control" type="text"
                           name="lname" id="lastName"
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="email">Email</label>
                </div>
                <div className="col">
                    <input required="Required"
                           className="form-control" type="email"
                           name="email" id="email"
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="userName">User Name</label>
                </div>
                <div className="col">
                    <input pattern="^[A-Za-z][A-Za-z0-9_]{7,29}$" required="Required"
                           className="form-control" type="text"
                           name="user" id="userName"
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="pwd">Password</label>
                </div>
                <div className="col">
                    <input pattern="^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$" required="Required"
                           className="form-control" type="password"
                           name="pass" id="pwd"
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="zip">Zip Code</label>
                </div>
                <div className="col">
                    <input pattern="^\d{5}$" required="Required"
                           className="form-control" type="text"
                           name="zip" id="zip"
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="adminValue">Admin</label>
                </div>
                <div className="col">
                    <input type="checkbox" id="adminValue" checked={isChecked} onChange={handleCheck} name="admin"/>
                    {/*<p>The checkbox is {isChecked ? "checked" : "unchecked"}</p>*/}
                </div>

            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" type="submit">Register</button>
                </div>
            </div>
        </form>
    );
}