var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { color_themes, getdata } from '../@classes/ultility.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faCheck, faEnvelope, faKey, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
function Login() {
    const [loggedIn, setLoggedIn] = useState({
        username: false,
        password: false
    });
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');
    const [remember, Setremember] = useState(true);
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, formState } = useForm(formOptions);
    const { errors } = formState;
    const handleChange = (event) => {
        const name = event.target.name;
        if (name == "uname") {
            Setusername(event.target.value);
        }
        else if (name == "psw") {
            Setpassword(event.target.value);
        }
        else if (name == "rmb") {
            Setremember(event.target.checked);
        }
    };
    const handleSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const res = yield getdata("get", "users", username);
        const name = (res != undefined) ? res.username : undefined;
        const pass = (res != undefined) ? res.password : undefined;
        if (name == undefined) {
            setLoggedIn({
                username: false,
                password: loggedIn.password
            });
        }
        else if (pass != password) {
            setLoggedIn({
                username: true,
                password: false
            });
        }
        else {
            console.log("okay");
            setLoggedIn({
                username: true,
                password: true
            });
            Cookies.set("user", username, { expires: 28 });
            Cookies.set("remember", (remember) ? "true" : "false", { expires: 28 });
            window.location.href = "/";
        }
    });
    return (React.createElement("div", { className: "container", style: { display: "block", paddingTop: "5%" } },
        React.createElement("form", { className: 'loginform', onChange: (e) => {
                const name = e.target.name;
                if (name == "uname") {
                    Setusername(e.target.value);
                }
                else if (name == "psw") {
                    Setpassword(e.target.value);
                }
                else if (name == "rmb") {
                    Setremember(e.target.checked);
                }
            } },
            React.createElement("table", { style: { display: "table" } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", { style: { paddingRight: "5px" } },
                            React.createElement(FontAwesomeIcon, { icon: faUser })),
                        React.createElement("th", null,
                            React.createElement("input", { style: { width: "200px" }, className: "username", type: "text", placeholder: "Enter Username", name: "uname", value: username, required: true }))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faKey })),
                        React.createElement("th", null,
                            React.createElement("input", Object.assign({ style: { width: "200px" }, className: "password", type: "password" }, register('password'), { placeholder: "Enter Password", name: "psw", value: password, required: true })))))),
            React.createElement("hr", { id: "stm" }),
            React.createElement("hr", { id: "more" }),
            React.createElement("label", { style: { display: "block", float: "left" } },
                React.createElement("input", { type: "checkbox", name: "rmb", checked: remember }),
                React.createElement("a", { id: "rmb" }, "remember me")),
            React.createElement("button", { type: "submit", className: 'submit', onClick: handleSubmit, style: { float: "inline-end" } },
                React.createElement("a", null, "Sign in")))));
}
function Already() {
    return (React.createElement("div", { className: "container", style: { display: "block" } },
        React.createElement("form", { className: 'loginform' },
            React.createElement("a", null, "Loged in bruh"))));
}
function Singupform() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [allowed, setAllowed] = useState(true);
    const [pswsimilar, Setpswsimilar] = useState(true);
    const [pswle, Setpswle] = useState(true);
    const [fname, Setfname] = useState(true);
    const [usralrd, Setusralrd] = useState(true);
    const [username, Setusername] = useState("");
    const [fullname, Setfullname] = useState("");
    const [password, Setpassword] = useState("");
    const [passwordagain, Setpasswordagain] = useState("");
    const [email, Setemail] = useState("");
    const [remember, Setremember] = useState(true);
    console.log("allowed ", allowed);
    console.log("password >= 8:  ", pswle);
    console.log("comfrim similar ", pswsimilar);
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, formState } = useForm(formOptions);
    const { errors } = formState;
    function check_user(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = yield getdata("get", "users", "all");
            console.log(temp[username]);
            if (temp[username] == undefined || username.includes(" ")) {
                return true;
            }
            return false;
        });
    }
    const handleChage = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "fname") {
            Setfullname(value);
        }
        else if (name == "uname") {
            Setusername(value);
        }
        else if (name == "psw") {
            Setpassword(value);
        }
        else if (name == "pswa") {
            Setpasswordagain(value);
        }
        else if (name == "mail") {
            Setemail(value);
        }
        else if (name == "rmb") {
            Setremember(event.target.checked);
        }
    };
    function CheckFullname() {
        if (fname == false) {
            return (React.createElement("div", null,
                React.createElement("span", null,
                    React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "Fullname must be at least 1 character"))));
        }
        return (React.createElement(React.Fragment, null));
    }
    function CheckAllowed() {
        if (!usralrd) {
            return (React.createElement("div", null,
                React.createElement("span", null,
                    React.createElement("a", { style: { WebkitTextFillColor: "red" } }, (username == "") ? "Username must be at least 1 character" : ((username.includes(" ")) ? "Username must not have space" : "This username already exists")))));
        }
        return (React.createElement(React.Fragment, null));
    }
    function CheckPsw() {
        if (!pswle) {
            return (React.createElement("div", null,
                React.createElement("span", null,
                    React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "Password must be at least 8 characters"))));
        }
        return (React.createElement(React.Fragment, null));
    }
    function Checkpswsr() {
        if (!pswsimilar) {
            return (React.createElement("div", null,
                React.createElement("span", null,
                    React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "Comfirm password must be similar to password"))));
        }
        return (React.createElement(React.Fragment, null));
    }
    const hanldeSubmitForm = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const all_language_code = ["C++03", "C++11", "C++14", "C++17", "C++20", "C++ (Themis)", "Python 3", "java", "javascript"];
        const default_language = "C++20";
        const checking = {
            fname: (fullname != "") ? true : false,
            username_check: (yield check_user(username)) ? false : true,
            pswsimilar: (password === passwordagain) ? true : false,
            pswle: (password.length >= 8),
            res: true
        };
        checking.res = ((checking.username_check === true) && checking.pswle && checking.pswsimilar);
        console.log(checking.username_check);
        Setusralrd((checking.username_check == true) ? true : false);
        Setfname((checking.fname == true) ? true : false);
        Setpswle(checking.pswle);
        Setpswsimilar(checking.pswsimilar);
        if (checking.res) {
            setAllowed(true);
            setLoggedIn(true);
            const temp = JSON.parse(localStorage.getItem("users")) || {};
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
            };
            yield getdata("post", "users", user);
            Cookies.set("user", username, { expires: 28 });
            Cookies.set("remember", (remember) ? "true" : "false", { expires: 28 });
            window.location.href = "/";
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container", style: { display: "block", position: "relative" } },
            React.createElement("form", { className: 'loginform', onChange: (e) => {
                    const name = e.target.name;
                    const value = e.target.value;
                    if (name == "fname") {
                        Setfullname(value);
                    }
                    else if (name == "uname") {
                        Setusername(value);
                    }
                    else if (name == "psw") {
                        Setpassword(value);
                    }
                    else if (name == "pswa") {
                        Setpasswordagain(value);
                    }
                    else if (name == "mail") {
                        Setemail(value);
                    }
                    else if (name == "rmb") {
                        Setremember(e.target.checked);
                    }
                } },
                React.createElement("a", { style: { display: "flex", justifyContent: "space-around" } }, "Signup"),
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faSignature, style: { display: "flex", } })),
                        React.createElement("th", null,
                            React.createElement("input", { className: "fullname", type: "text", placeholder: "Enter Fullname", name: "fname", required: true }))),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement(CheckFullname, null))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faUser })),
                        React.createElement("th", null,
                            React.createElement("input", { className: "username", type: "text", placeholder: "Enter Username", name: "uname", required: true }))),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement(CheckAllowed, null))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faEnvelope })),
                        React.createElement("th", null,
                            React.createElement("input", { className: "email", type: "text", placeholder: "Enter Email", name: "mail", required: true }))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faKey })),
                        React.createElement("th", null,
                            React.createElement("input", Object.assign({ className: "password", type: "password" }, register('password'), { placeholder: "Enter password", name: "psw", required: true })))),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement(CheckPsw, null))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faCheck })),
                        React.createElement("th", null,
                            React.createElement("input", Object.assign({ className: "apassword", type: "password" }, register('confirmPassword'), { placeholder: "Enter Password again", name: "pswa", required: true })))),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement(Checkpswsr, null)))),
                React.createElement("hr", { id: 'stm' }),
                React.createElement("hr", { id: 'more' }),
                React.createElement("label", { style: { display: "block", float: "left" } },
                    React.createElement("input", { type: "checkbox", name: "rmb", checked: remember }),
                    React.createElement("a", { id: "rmb" }, "remember me")),
                React.createElement("button", { type: "submit", className: 'submit', onClick: hanldeSubmitForm, style: { float: "inline-end" } },
                    React.createElement("a", null, "Sign up"))))));
}
export function Userring() {
    const [mode, setmode] = useState("login");
    return (React.createElement("div", { className: 'container', style: { display: "flex", justifyContent: "center", alignItems: "center", width: "100%" } },
        React.createElement("form", { className: 'account_form', style: { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" } },
            React.createElement("span", null,
                React.createElement("a", null, "Login"),
                " Or ",
                React.createElement("a", null, "Sign up")),
            React.createElement("br", null),
            React.createElement("button", { style: {
                    height: "15px", width: "30px", borderRadius: "50px", border: "1px solid black", position: "relative"
                }, onClick: (e) => {
                    e.preventDefault();
                    setmode((mode == "login") ? "signup" : "login");
                } },
                React.createElement("div", { style: {
                        height: "15px", width: "15px", borderRadius: "50px",
                        display: "flex", justifyContent: "center", alignItems: "center",
                        position: "absolute",
                        transform: (mode == "login") ? "translate(-1.5px, -7.5px)" : "translate(14px, -7.5px)",
                        transition: "all 1s ease-in-out",
                        backgroundColor: color_themes
                    } },
                    React.createElement(FontAwesomeIcon, { icon: (mode == "login") ? faCaretRight : faCaretLeft }))),
            React.createElement("br", null),
            React.createElement("div", { className: `flipper ${mode}`, style: { transformStyle: "preserve-3d", transition: "all 1s" } }, mode == "login" ? React.createElement(Login, null) : React.createElement(Singupform, null)))));
}
//# sourceMappingURL=account.js.map