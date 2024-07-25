// gộp log in với sign up :V
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { color_themes } from "ultility/color.js";
import { Login } from "./login.js";
import { Singup } from "./signup.js";
// làm nút chuyển log in với sign up
export function Userring() {
    if (localStorage.getItem("username") != null) {
        window.location.href = "/";
    }
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
                        transition: "all 1.5s",
                        backgroundColor: color_themes
                    } },
                    React.createElement(FontAwesomeIcon, { icon: faCaretRight, style: { rotate: `${(mode == "login") ? "0deg" : "180deg"}`, transition: "all 1.5s" } }))),
            React.createElement("br", null),
            React.createElement("div", { className: "flipper" },
                React.createElement("div", { className: `flip-card${mode == "login" ? "" : " flipped"}` },
                    React.createElement("div", { className: "flip-card-login" },
                        React.createElement(Login, null)),
                    React.createElement("div", { className: "flip-card-signup" },
                        React.createElement(Singup, null)))))));
}
//# sourceMappingURL=index.js.map