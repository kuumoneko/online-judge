var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faSignature, faUser, faEnvelope, faKey, faEye, faEyeSlash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { getdata } from "online-judge-types";
import Cookies from 'js-cookie';
export function Singup() {
    const [data, setdata] = useState(["", "", "", "", ""]);
    const [UI, setUI] = useState(["", ""]);
    const [check_data, setcheck_data] = useState([true, true, true, true, true]);
    const [seeing, setsee] = useState([false, false]);
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
    useEffect(() => {
        let temp1 = "", temp2 = "";
        if (data[3].length > 0) {
            temp1 = (!seeing[0]) ? Array(data[3].length).fill("-").reduce((item, str) => str + item) : data[3];
        }
        else {
            temp1 = "";
        }
        if (data[4].length > 0) {
            temp2 = (!seeing[1]) ? Array(data[4].length).fill("-").reduce((item, str) => str + item) : data[4];
        }
        else {
            temp2 = "";
        }
        setUI([
            temp1, temp2
        ]);
    }, [seeing]);
    const hanldeSubmitForm = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const checkingg = [
            (data[0] == "") ? false : true,
            (data[1] == "") ? false : true,
            (data[2].includes(".") && data[2].includes("@")),
            (data[3].length >= 8) ? true : false,
            (data[4] == data[3]) ? true : false
        ];
        setcheck_data(checkingg);
        console.log((data[2].includes("."), ' ', data[2].includes("@")));
        console.log(checkingg[0] == checkingg[1] == checkingg[2] == checkingg[3] == checkingg[4] == true);
        if (checkingg[0] == checkingg[1] == checkingg[2] == checkingg[3] == checkingg[4] == true) {
            const res = yield getdata("signup", "", { fullname: data[0], username: data[1], email: data[2], password: data[3] });
            console.log(res);
            if (res == "Username existed") {
                setcheck_data([check_data[0], false, check_data[2], check_data[3], check_data[4]]);
            }
            else {
                console.log("Ok");
                Cookies.set("remember", (remember) ? "true" : "false", { expires: 28 });
                window.location.href = "/";
            }
        }
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container", style: { display: "block", position: "relative" } },
            React.createElement("form", { className: 'loginform', onChange: (e) => {
                    const name = e.target.name;
                    const value = e.target.value;
                    if (name == "rmb" || e.target.id == "rmb") {
                        Setremember(!remember);
                        return;
                    }
                    else {
                        let temp = data;
                        const temping = ["fname", "uname", "mail", "psw", "pswa"];
                        if (name == "psw") {
                            if (value.length < temp[3].length) {
                                temp[3] = temp[3].substring(0, value.length);
                            }
                            else {
                                temp[3] = temp[3] + value[value.length - 1];
                            }
                        }
                        else if (name == "pswa") {
                            if (value.length < temp[4].length) {
                                temp[4] = temp[4].substring(0, value.length);
                            }
                            else {
                                temp[4] = temp[4] + value[value.length - 1];
                            }
                        }
                        else {
                            temp[temping.findIndex((item) => (item == name))] = value;
                        }
                        if (name == "psw" || name == "pswa") {
                            let temp1 = "", temp2 = "";
                            if (temp[3].length > 0) {
                                temp1 = (!seeing[0]) ? Array(temp[3].length).fill("-").reduce((item, str) => str + item) : temp[3];
                            }
                            else {
                                temp1 = "";
                            }
                            if (temp[4].length > 0) {
                                temp2 = (!seeing[1]) ? Array(temp[4].length).fill("-").reduce((item, str) => str + item) : temp[4];
                            }
                            else {
                                temp2 = "";
                            }
                            setUI([
                                temp1, temp2
                            ]);
                        }
                        setdata(temp);
                    }
                } },
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("th", { style: { width: "5%" } },
                            React.createElement(FontAwesomeIcon, { icon: faSignature, style: { display: "flex", } })),
                        React.createElement("th", { style: { width: "90%" } },
                            React.createElement("input", { className: "fullname", type: "text", placeholder: "Enter Fullname", name: "fname", required: true })),
                        React.createElement("th", { style: { width: "5%" } })),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null, !check_data[0] && (React.createElement("div", null,
                            React.createElement("span", null,
                                React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "Fullname must be at least 1 character")))))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faUser })),
                        React.createElement("th", null,
                            React.createElement("input", { className: "username", type: "text", placeholder: "Enter Username", name: "uname", required: true }))),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null, !check_data[1] && (React.createElement("div", null,
                            React.createElement("span", null,
                                React.createElement("a", { style: { WebkitTextFillColor: "red" } }, (data[0] == "") ? "Username must be at least 1 character" : ((data[0].includes(" ")) ? "Username must not have space" : "This username already exists"))))))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faEnvelope })),
                        React.createElement("th", null,
                            React.createElement("input", { className: "email", type: "text", placeholder: "Enter Email", name: "mail", required: true }))),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null, !check_data[2] && (React.createElement("div", null,
                            React.createElement("span", null,
                                React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "invalid email")))))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faKey })),
                        React.createElement("th", null,
                            React.createElement("input", { className: "password", type: "text", placeholder: "Enter password", name: "psw", required: true, value: UI[0] })),
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: (seeing[0] ? faEye : faEyeSlash), onClick: (e) => {
                                    e.preventDefault();
                                    setsee([!seeing[0], seeing[1]]);
                                } }))),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null, !check_data[3] && (React.createElement("div", null,
                            React.createElement("span", null,
                                React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "Password must be at least 8 characters")))))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faCheck })),
                        React.createElement("th", null,
                            React.createElement("input", { className: "apassword", type: "text", placeholder: "Enter Password again", name: "pswa", required: true, value: UI[1] })),
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: (seeing[1] ? faEye : faEyeSlash), onClick: (e) => {
                                    e.preventDefault();
                                    setsee([seeing[0], !seeing[1]]);
                                } }))),
                    React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null, !check_data[4] && (React.createElement("div", null,
                            React.createElement("span", null,
                                React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "Comfirm password must be similar to password"))))))),
                React.createElement("hr", { id: 'stm' }),
                React.createElement("hr", { id: 'more' }),
                React.createElement("label", { style: { display: "block", float: "left" } },
                    React.createElement("input", { type: "checkbox", name: "rmb", checked: remember }),
                    React.createElement("a", { id: "rmb" }, "remember me")),
                React.createElement("button", { type: "submit", className: 'submit', onClick: hanldeSubmitForm, style: { float: "inline-end" } },
                    React.createElement("a", null, "Sign up"))))));
}
//# sourceMappingURL=signup.js.map