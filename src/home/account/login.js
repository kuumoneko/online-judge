import { faUser, faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { getdata } from "ultility/ulti.js";
import { color } from "ultility/color.js";
export function Login() {
    // information
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');
    const [remember, Setremember] = useState(true);
    const [seeing, setsee] = useState(false);
    const [UI, setUI] = useState("");
    const [submit, setsubmit] = useState(false);
    // [username , password]
    const [error, seterror] = useState([false, false]);
    const theme = color[Cookies.get("theme")];
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
        async function lmao() {
            const res = await getdata("login", "users", { username: username, password: password });
            // console.log(res)
            if (res.status == 200) {
                seterror([false, false]);
                Cookies.set("remember", (remember) ? "true" : "false", { expires: 30 });
                window.location.href = "/";
            }
            else if (res.data.data == "Wrong password") {
                seterror([false, true]);
            }
            else if (res.data.data.includes("Can't")) {
                seterror([true, false]);
            }
            setsubmit(false);
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
                    // console.log(value, ' ', temp)
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
                    // set_pre_psw(password)
                    // console.log(temp1)
                    Setpassword(temp);
                    setUI(temp1);
                }
                else if (name == "rmb") {
                    Setremember(e.target.checked);
                }
            } },
            React.createElement("table", { className: "account", style: { display: "table" } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", { style: { paddingRight: "5px" } },
                            React.createElement(FontAwesomeIcon, { icon: faUser })),
                        React.createElement("th", null,
                            React.createElement("input", { style: { width: "200px", backgroundColor: theme.background, color: theme.font }, className: "username", type: "text", placeholder: "Enter Username", name: "uname", value: username, 
                                // onChange={handleUsernameChange} // Handle changes in the input field
                                required: true }))),
                    error[0] && (React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement("a", null, " Username doesn't matched")))),
                    React.createElement("tr", null,
                        React.createElement("th", null,
                            React.createElement(FontAwesomeIcon, { icon: faKey })),
                        React.createElement("th", null,
                            React.createElement("input", { style: { width: "200px", backgroundColor: theme.background, color: theme.font }, className: "password", type: "text", placeholder: "Enter Password", name: "psw", value: UI, 
                                // onChange={handlePasswordChange} // Handle changes in the input field
                                required: true })),
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
            React.createElement("div", { style: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                } },
                React.createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column"
                    } },
                    React.createElement("label", { style: { display: "block", float: "left" } },
                        React.createElement("input", { type: "checkbox", name: "rmb", checked: remember }),
                        React.createElement("a", { id: "rmb" }, "remember me")),
                    React.createElement("a", { style: { cursor: "pointer" }, onClick: (e) => {
                            window.location.href = `/forget_password/${username}/verify`;
                        } }, "Forget password?")),
                React.createElement("button", { type: "submit", className: 'submit', onClick: (e) => { e.preventDefault(); setsubmit(true); }, style: { float: "inline-end" } },
                    React.createElement("a", null, "Sign in"))))));
}
//# sourceMappingURL=login.js.map