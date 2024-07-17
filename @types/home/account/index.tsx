// gộp log in với sign up :V

import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { color_themes } from "types";
import { Login } from "./login.js";
import { Singup } from "./signup.js";

// làm nút chuyển log in với sign up
export function Userring() {

    if (
        localStorage.getItem("username") != null
    ) {
        window.location.href = "/"
    }

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
                        transition: "all 1.5s",
                        backgroundColor: color_themes
                    }}>
                        <FontAwesomeIcon icon={faCaretRight} style={{ rotate: `${(mode == "login") ? "0deg" : "180deg"}`, transition: "all 1.5s" }} />
                    </div>
                </button>

                <br />
                <div className="flipper">
                    <div className={`flip-card${mode == "login" ? "" : " flipped"}`}>
                        <div className="flip-card-login">
                            <Login />
                        </div>
                        <div className="flip-card-signup">
                            <Singup />
                        </div>
                    </div>
                </div>


            </form >
        </div >
    )
}


