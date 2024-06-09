var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faUser, faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { getdata } from "online-judge-types";
export function Login() {
    const [loggedIn, setLoggedIn] = useState({
        username: false,
        password: false
    });
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');
    const [remember, Setremember] = useState(true);
    const [pre_psw, set_pre_psw] = useState("");
    const [seeing, setsee] = useState(false);
    const [UI, setUI] = useState("");
    const [submit, setsubmit] = useState(false);
    const [error, seterror] = useState([false, false]);
    useEffect(() => {
        let temp1 = "";
        if (password.length > 0) {
            temp1 = (!seeing) ? Array(password.length).fill("-").reduce((item, str) => str + item) : password;
        }
        else {
            temp1 = "";
        }
        setUI(temp1);
    }, [seeing]);
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield getdata("login", "users", { username: username, password: password });
                console.log(res);
                if (res.status == 200) {
                    seterror([false, false]);
                    Cookies.set("remember", (remember) ? "true" : "false", { expires: 30 });
                    window.location.href = "/";
                }
                else if (res == "Wrong password") {
                    seterror([false, true]);
                }
                else if (res.includes("Can't")) {
                    seterror([true, false]);
                }
                setsubmit(false);
            });
        }
        ;
        if (submit == true) {
            lmao();
        }
    }, [submit]);
    return (React.createElement("div", { className: "container", style: { display: "block", paddingTop: "5%" } },
        React.createElement("form", { className: 'loginform', onChange: (e) => {
                const name = e.target.name;
                const value = e.target.value;
                if (name == "uname") {
                    Setusername(value);
                }
                else if (name == "psw") {
                    let temp = password;
                    if (value.length < temp.length) {
                        temp = temp.substring(0, value.length);
                    }
                    else {
                        temp = temp + value[value.length - 1];
                    }
                    let temp1 = "";
                    if (temp.length > 0) {
                        temp1 = (!seeing) ? Array(temp.length).fill("-").reduce((item, str) => str + item) : temp;
                    }
                    else {
                        temp1 = "";
                    }
                    Setpassword(temp);
                    setUI(temp1);
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
                    error[0] && (React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement("a", null, " Username doesn't matched")))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faKey })),
                        React.createElement("th", null,
                            React.createElement("input", { style: { width: "200px" }, className: "password", type: "text", placeholder: "Enter Password", name: "psw", value: UI, required: true })),
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: (seeing ? faEye : faEyeSlash), onClick: (e) => {
                                    e.preventDefault();
                                    setsee(!seeing);
                                } }))),
                    error[1] && (React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement("a", null, " Wrong password")))))),
            React.createElement("hr", { id: "stm" }),
            React.createElement("hr", { id: "more" }),
            React.createElement("label", { style: { display: "block", float: "left" } },
                React.createElement("input", { type: "checkbox", name: "rmb", checked: remember }),
                React.createElement("a", { id: "rmb" }, "remember me")),
            React.createElement("button", { type: "submit", className: 'submit', onClick: (e) => { e.preventDefault(); setsubmit(true); }, style: { float: "inline-end" } },
                React.createElement("a", null, "Sign in")))));
}
//# sourceMappingURL=login.js.map