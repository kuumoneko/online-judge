import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { color_themes, getdata } from '../@classes/ultility.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faCheck, faEnvelope, faKey, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';



function Login() {
    // backend
    const [loggedIn, setLoggedIn] = useState({
        username: false,
        password: false
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


    const handleChange = (event: { target: { name: any; value: React.SetStateAction<string>; checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        // console.log(event.target)
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
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Do something with the username, like sending it to a server

        // const temp = await axios.post("http://localhost:3001/api/data", { method: "get", mode: "users", data: username }, {})
        const res = await getdata("get", "users", username)
        // res = res["0"]
        // console.log(res)
        // console.log(res) 

        // const res = temp.data.data;


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
            // const item = {
            //     username: res.username,
            //     role: res.role,
            //     color: get_rank_color(res.rank, res.role),
            //     fullname: res.fullname,
            //     email: res.email,
            //     group: res.group
            // }
            // localStorage.setItem("user", JSON.stringify({ username: res.username, role: res.role }))
            window.location.href = "/"
        }
    };



    return (
        <div className="container" style={{ display: "block", paddingTop: "5%" }}>
            <form className='loginform' onChange={(e) => {
                const name = (e.target as HTMLInputElement).name
                if (name == "uname") {
                    Setusername((e.target as HTMLInputElement).value);
                }
                else if (name == "psw") {
                    Setpassword((e.target as HTMLInputElement).value);
                }
                else if (name == "rmb") {
                    Setremember((e.target as HTMLInputElement).checked)
                }
            }}>
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
                <label style={{ display: "block", float: "left" }}>
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



function Already() {
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



function Singupform() {


    // back-end
    const [loggedIn, setLoggedIn] = useState(false);
    const [allowed, setAllowed] = useState<boolean>(true);
    const [pswsimilar, Setpswsimilar] = useState(true)
    const [pswle, Setpswle] = useState(true)
    const [fname, Setfname] = useState(true)
    const [usralrd, Setusralrd] = useState(true)

    // information
    const [username, Setusername] = useState("");
    const [fullname, Setfullname] = useState("");
    const [password, Setpassword] = useState("");
    const [passwordagain, Setpasswordagain] = useState("");
    const [email, Setemail] = useState("");

    const [remember, Setremember] = useState(true)

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



    async function check_user(username: string) {
        const temp = await getdata("get", "users", "all");
        // const temp = JSON.parse(localStorage.getItem("users")) || {};
        console.log(temp[username])
        if (temp[username] == undefined || username.includes(" ")) {
            return true;
        }

        return false;

    }

    const handleChage = (event: { target: { name: any; value: any; checked: boolean | ((prevState: boolean) => boolean); }; }) => {
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
        else if (name == "mail") {
            Setemail(value)
        }
        else if (name == "rmb") {
            Setremember(event.target.checked)
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
        return (
            <></>
        )
    }

    function CheckAllowed() {

        if (!usralrd) {
            return (
                <div>
                    <span>
                        <a style={{ WebkitTextFillColor: "red" }}>
                            {
                                (username == "") ? "Username must be at least 1 character" : ((username.includes(" ")) ? "Username must not have space" : "This username already exists")
                                // (username != "") ? "This username already exists" : "Username must be at least 1 character"
                            }

                        </a>
                    </span>
                </div>

            )
        }
        return (
            <></>
        )
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
        return (
            <></>
        )
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
        return (
            <></>
        )
    }

    // Function to handle form submission
    const hanldeSubmitForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Do something with the username, like sending it to a server

        const all_language_code = ["C++03", "C++11", "C++14", "C++17", "C++20", "C++ (Themis)", "Python 3", "java", "javascript"];
        const default_language = "C++20";

        const checking: {
            fname: boolean,
            username_check: boolean,
            pswsimilar: boolean,
            pswle: boolean,
            res: boolean
        } = {
            fname: (fullname != "") ? true : false,
            username_check: (await check_user(username)) ? false : true,
            pswsimilar: (password === passwordagain) ? true : false,
            pswle: (password.length >= 8),
            res: true
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
            const temp = JSON.parse(localStorage.getItem("users") as string) || {};


            const user = {
                fullname: fullname,
                username: username,
                password: password,
                email: email,
                group: [],
                contribute: 0,
                points: 0,
                problems_count: 0,
                rank: 0,
                role: "User",
                language: {
                    languages: all_language_code,
                    default_language: default_language,
                },
                themes: {
                    color: "#ff9797",
                    mode: "light"
                },
                profile: {
                    data: "",
                    html: "",
                },
                problems: [],
                blogs: []
            }

            // await axios.post("http://localhost:3001/api/data", { method: "post", mode: "users", data: user }, {})

            await getdata("post", "users", user)
            Cookies.set("user", username);
            Cookies.set("remember", (remember) ? "true" : "false");
            // localStorage.setItem("user", JSON.stringify({ username: username, role: "User" }))
            window.location.href = "/";
        }
    };

    return (
        <>
            <div className="container" style={{ display: "block", position: "relative" }}>
                <form className='loginform' onChange={(e) => {
                    const name = (e.target as HTMLInputElement).name;
                    const value = (e.target as HTMLInputElement).value;
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
                    else if (name == "mail") {
                        Setemail(value)
                    }
                    else if (name == "rmb") {
                        Setremember((e.target as HTMLInputElement).checked)
                    }
                }}>
                    <a style={{ display: "flex", justifyContent: "space-around" }}>
                        Signup
                    </a>
                    <table>
                        {/* Input field for the full name */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faSignature} style={{ display: "flex", }} />
                            </th>
                            <th>
                                <input className="fullname"
                                    type="text"
                                    placeholder="Enter Fullname"
                                    name="fname"
                                    required />

                                {/* </input> */}
                            </th>
                        </tr>
                        <tr>
                            <th />
                            <th>
                                <CheckFullname />
                            </th>
                        </tr>

                        {/* Input field for the username */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faUser} />
                            </th>
                            <th>
                                <input
                                    className="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    name="uname"
                                    required />
                            </th>
                        </tr>
                        <tr>
                            <th />
                            <th>
                                <CheckAllowed />
                            </th>
                        </tr>

                        {/* Input field for the email */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </th>
                            <th>
                                <input
                                    className="email"
                                    type="text"
                                    placeholder="Enter Email"
                                    name="mail"
                                    required
                                />
                            </th>
                        </tr>

                        {/* Input field for the password */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faKey} />
                            </th>
                            <th>
                                <input
                                    className="password"
                                    type="password" {...register('password')}
                                    placeholder="Enter password"
                                    name="psw"
                                    required />

                            </th>
                        </tr>
                        <tr>
                            <th />
                            <th>
                                <CheckPsw />
                            </th>
                        </tr>

                        {/* Input field for the password again */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faCheck} />
                            </th>
                            <th>
                                <input
                                    className="apassword"
                                    type="password" {...register('confirmPassword')}
                                    placeholder="Enter Password again"
                                    name="pswa"
                                    required />
                            </th>
                        </tr>
                        <tr>
                            <th />
                            <th>
                                <Checkpswsr />
                            </th>
                        </tr>

                    </table>
                    <hr id='stm' />
                    <hr id='more' />
                    <label style={{ display: "block", float: "left" }}>
                        <input type="checkbox" name="rmb" checked={remember} />
                        <a id="rmb">
                            remember me
                        </a>
                    </label>
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


// gộp log in với sign up :V
// làm nút chuyển log in với sign up
export function Userring() {

    const [mode, setmode] = useState("login");



    return (
        <div className='container' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <form className='account_form' style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <span>
                    <a>Login</a>
                    {" Or "}
                    <a>Sign up</a>


                </span>
                <br />
                <button style={{
                    height: "15px", width: "30px", borderRadius: "50px", border: "1px solid black", position: "relative"
                }}
                    onClick={(e) => {
                        e.preventDefault();
                        setmode((mode == "login") ? "signup" : "login");

                    }}
                >
                    <div style={{
                        height: "15px", width: "15px", borderRadius: "50px",
                        display: "flex", justifyContent: "center", alignItems: "center",
                        position: "absolute",
                        transform: (mode == "login") ? "translate(-1.5px, -7.5px)" : "translate(14px, -7.5px)",
                        transition: "all 1s ease-in-out",
                        backgroundColor: color_themes
                    }}>
                        <FontAwesomeIcon icon={(mode == "login") ? faCaretRight : faCaretLeft} />
                    </div>
                </button>

                <br />
                <div className={`flipper ${mode}`} style={{ transformStyle: "preserve-3d", transition: "all 1s" }} >
                    {mode == "login" ? <Login /> : <Singupform />}
                </div>


            </form >
        </div >
    )
}


