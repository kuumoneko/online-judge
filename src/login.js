import { useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Cookies from "js-cookie";
import { getUser } from "./ulti.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";

export function Loginform() {
    // backend
    const [loggedIn, setLoggedIn] = useState({
        username: true,
        password: true
    });

    // information
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');
    const [remember, Setremember] = useState(true)

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


    const handleChange = (event) => {
        console.log(event.target)
        const name = event.target.name
        if (name == "uname") {
            Setusername(event.target.value);
        }
        else if (name == "psw") {
            Setpassword(event.target.value);
        }
        else if (name == "rmb") {
            Setremember(event.target.checked)
        }
    }

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Do something with the username, like sending it to a server

        const indexedDB = window.indexedDB;

        const test = indexedDB.open("users", 1)

        test.onupgradeneeded = (event) => {
            const db = event.target.result
            db.createObjectStore("user")
        }

        test.onsuccess = async (event) => {
            const db = event.target.result;

            const temp = await getUser(db, username)

            const res = temp.result


            const name = (res != undefined) ? res.username : undefined;
            const pass = (res != undefined) ? res.password : undefined;

            if (name == undefined) {
                setLoggedIn({
                    username: false,
                    password: loggedIn.password
                })
            }
            else if (pass != password) {
                setLoggedIn({
                    username: true,
                    password: false
                })
            }
            else {
                console.log("okay")
                setLoggedIn({
                    username: true,
                    password: true
                })
                Cookies.set("user", username);
                Cookies.set("remember", (remember) ? "true" : "false")
                localStorage.setItem("user", JSON.stringify({ username: res.username, role: res.role }))
                window.location.href = "/"
            }

        }



    };



    function Create_stm({ mode }) {

        if (mode == "username" && loggedIn.username == false) {
            return (
                <div>
                    <span>
                        <a style={{ WebkitTextFillColor: "red" }}>
                            Username does not exist
                        </a>
                    </span>
                </div>
            )
        }
        else if (mode == "password" && loggedIn.password == false) {
            return (
                <div>
                    <span>
                        <a style={{ WebkitTextFillColor: "red" }}>
                            Wrong password, please try again
                        </a>
                    </span>
                </div>
            )
        }
    }

    return (
        <div className="container" style={{ display: "block", paddingTop: "5%" }}>
            <form className='loginform' onChange={handleChange}>
                <table style={{ display: "table" }}>
                    <tbody>
                        <tr>
                            <th style={{ paddingRight: "5px" }}>
                                <FontAwesomeIcon icon={faUser} />
                            </th>
                            <th>
                                <input
                                    style={{ width: "200px" }}
                                    className="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    name="uname"
                                    value={username} // Bind the value of the input field to the state
                                    // onChange={handleUsernameChange} // Handle changes in the input field
                                    required
                                />
                            </th>
                        </tr>

                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faKey} />
                            </th>
                            <th>
                                <input
                                    style={{ width: "200px" }}
                                    className="password"
                                    type="password"{...register('password')}
                                    placeholder="Enter Password"
                                    name="psw"
                                    value={password} // Bind the value of the input field to the state
                                    // onChange={handlePasswordChange} // Handle changes in the input field
                                    required
                                />
                            </th>
                        </tr>
                    </tbody>
                </table>

                {/* Button to submit the form */}
                <hr id="stm" />
                <hr id="more" />
                <label style={{ display: "block" }}>
                    <input type="checkbox" name="rmb" checked={remember} />
                    <a id="rmb">
                        remember me
                    </a>
                </label>

                <button type="submit" className='submit' onClick={handleSubmit} style={{ float: "inline-end" }}>
                    <a>
                        Sign in
                    </a>
                </button>

            </form>
        </div>

    );
}