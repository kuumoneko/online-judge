// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { insertUser } from './ulti.js';
import axios from "axios";

export function Already() {
    return (
        <div className="container" style={{ display: "block" }}>
            <form className='loginform'>
                {/* Input field for the username */}
                <a>
                    Loged in bruh
                </a>
            </form>
        </div>
    )
}



export function Singupform() {


    // back-end
    const [loggedIn, setLoggedIn] = useState(false);
    const [allowed, setAllowed] = useState("true");
    const [pswsimilar, Setpswsimilar] = useState(true)
    const [pswle, Setpswle] = useState(true)
    const [fname, Setfname] = useState(true)
    const [usralrd, Setusralrd] = useState(true)

    // information
    const [username, Setusername] = useState("");
    const [fullname, Setfullname] = useState("");
    const [password, Setpassword] = useState("");
    const [passwordagain, Setpasswordagain] = useState("");


    console.log("allowed ", allowed)

    console.log("password >= 8:  ", pswle)
    console.log("comfrim similar ", pswsimilar)

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, formState } = useForm(formOptions);
    const { errors } = formState;



    function check_user({ username }) {
        const temp = JSON.parse(localStorage.getItem("users")) || {};
        console.log(temp[username])
        if (temp[username] == undefined) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleChage = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "fname") {
            Setfullname(value)
        }
        else if (name == "uname") {
            Setusername(value)
        }
        else if (name == "psw") {
            Setpassword(value)
        }
        else if (name == "pswa") {
            Setpasswordagain(value)
        }
    }

    function CheckFullname() {
        if (fname == false) {
            return (
                <div>
                    <span>
                        <a style={{ WebkitTextFillColor: "red" }}>
                            Fullname must be at least 1 character
                        </a>
                    </span>
                </div>

            )
        }
    }

    function CheckAllowed() {
        if (!usralrd) {
            return (
                <div>
                    <span>
                        <a style={{ WebkitTextFillColor: "red" }}>
                            {
                                (username != "") ? "This username already exists" : "Username must be at least 1 character"
                            }

                        </a>
                    </span>
                </div>

            )
        }
    }

    function CheckPsw() {
        if (!pswle) {
            return (
                <div>
                    <span>
                        <a style={{ WebkitTextFillColor: "red" }}>
                            Password must be at least 8 characters
                        </a>
                    </span>
                </div>

            )
        }
    }

    function Checkpswsr() {
        if (!pswsimilar) {
            return (
                <div>
                    <span>
                        <a style={{ WebkitTextFillColor: "red" }}>
                            Comfirm password must be similar to password
                        </a>
                    </span>
                </div>

            )
        }
    }

    // Function to handle form submission
    const hanldeSubmitForm = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Do something with the username, like sending it to a server


        const checking = {
            fname: (fullname != "") ? true : false,
            username_check: (check_user({ username: username })) ? true : false,
            pswsimilar: (password === passwordagain) ? true : false,
            pswle: (password.length >= 8)

        };

        checking.res = ((checking.username_check === true) && checking.pswle && checking.pswsimilar);
        console.log(checking.username_check)
        Setusralrd((checking.username_check == true) ? true : false)
        Setfname((checking.fname == true) ? true : false)
        Setpswle(checking.pswle)
        Setpswsimilar(checking.pswsimilar)

        if (checking.res) {
            setAllowed(true)
            setLoggedIn(true);
            const temp = JSON.parse(localStorage.getItem("users")) || {};
            const user = {
                fullname: fullname,
                username: username,
                password: password,
                points: 0,
                problems_count: 0,
                group: [],
                rank: "Newbie",
                role: "User"
            }

            await axios.post("http://localhost:3001/api/data", { method: "post", mode: "users", data: user }, {})
            Cookies.set("user", username);
            Cookies.set("remember", "true");
            localStorage.setItem("user", JSON.stringify({ username: username, role: "User" }))
            window.location.href = "/";

            // const db = window.indexedDB.open("users", 1);
            // db.onsuccess = (e) => {
            //     const db = e.target.result;
            //     insertUser(db, user);
            //     localStorage.setItem("users", JSON.stringify(temp))
            //     Cookies.set("user", username);
            //     Cookies.set("remember", "true")
            //     localStorage.setItem("user", JSON.stringify({ username: username, role: "user" }))
            //     window.location.href = "/"
            // }
        }
    };

    return (
        <>
            <div className="container" style={{ display: "block", position: "relative" }}>
                <form className='loginform' onChange={handleChage}>
                    {/* Input field for the full name */}
                    <div className='Header'>
                        Full name
                    </div>
                    <span className='Form'>
                        <input
                            className="fullname"
                            type="text"
                            placeholder="Enter Fullname"
                            name="fname"
                            required />
                    </span>
                    <CheckFullname />

                    {/* Input field for the username */}
                    <div className='Header'>
                        Username
                    </div>
                    <span className='Form'>
                        <input
                            className="username"
                            type="text"
                            placeholder="Enter Username"
                            name="uname"
                            required />
                    </span>
                    <CheckAllowed />

                    {/* Input field for the password */}
                    <div className='Header'>
                        Password
                    </div>
                    <span className='Form'>
                        <input
                            className="password"
                            type="password" {...register('password')}
                            placeholder="Enter password"
                            name="psw"
                            required />
                    </span>
                    <CheckPsw />

                    {/* Input field for the password again */}
                    <div className='Header'>
                        Password <small>
                            (For Comformation)
                        </small>
                    </div>
                    <span className='Form'>
                        <input
                            className="apassword"
                            type="password" {...register('confirmPassword')}
                            placeholder="Enter Password again"
                            name="pswa"
                            required />
                    </span>
                    <Checkpswsr />
                    <hr id='stm' />
                    <hr id='more' />
                    <button type="submit" className='submit' onClick={hanldeSubmitForm} style={{ float: "inline-end" }}>
                        <a>
                            Sign up
                        </a>
                    </button>
                </form>
            </div>

        </>
    )
}

// Cookies.set("mode" , "light")