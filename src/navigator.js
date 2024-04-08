// @ts-nocheck
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client";

function Loggedined({ loggedin, username }) {
    const [dropdowmVisible, setdropdowmVisible] = useState(false);

    const handleMouseEnter = () => {
        setdropdowmVisible(true);
    };

    const handleMouseLeave = () => {
        setdropdowmVisible(false);
    };

    const logout = () => {
        Cookies.remove("user")
        Cookies.remove("remember")
        localStorage.removeItem("user")
        document.location.reload()
    }

    if (!loggedin) {
        return (
            <>
                <li style={{ float: "right" }} >
                    <a href="/login">
                        Login
                    </a>
                </li>
                <li style={{ float: "right", height: "44.43px" }}>
                    <a style={{ WebkitTextFillColor: "#ccc", fontSize: "10px", paddingTop: "15px", display: "inline-block" }}>Or</a>
                </li>
                <li style={{ float: "right" }} >
                    <a href="/signup">
                        Sign up
                    </a>
                </li>
            </>
        )
    }



    return (
        <li
            className="dropdown"
            style={{ float: "right", textTransform: "none" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseEnter}
        >
            <a href="/profile" style={{ display: "inline-block" }} >
                Hello, <b className="italic">
                    {username}
                </b>
            </a>
            {
                dropdowmVisible && (

                    <>

                        <div className="dropdown-content" id="dropdown-content">
                            {
                                (JSON.parse(localStorage.getItem("user")).role == "administrator") ?
                                    (
                                        <>
                                            <a href="/admin">Admin</a>
                                            <a href="/edit_profile">Edit profile</a>
                                            <a onClick={logout} href="/">Logout</a>
                                        </>

                                    ) : (
                                        <>
                                            <a href="/edit_profile">Edit profile</a>
                                            <a onClick={logout} href="/">Logout</a>
                                        </>
                                    )
                            }

                        </div>
                    </>
                )
            }
        </li>
    )
}

export default function Navigator({ mode, loggedin, username }) {
    if (mode == "normal") {
        return (
            <nav>
                <ul>
                    <li>
                        <a href="/">
                            Home
                        </a>
                    </li>
                    <li>
                        <span className="nav-divider">

                        </span>
                    </li>
                    <li>
                        <a href="/problems">
                            Problems
                        </a>
                    </li>
                    <li>
                        <a href="/submissions">
                            Submissions
                        </a>
                    </li>
                    <li>
                        <a href="/users">
                            Users
                        </a>
                    </li>
                    <li>
                        <a href="/contests">
                            Contests
                        </a>
                    </li>
                    <li>
                        <a href="/about">
                            About
                        </a>
                    </li>
                    <Loggedined loggedin={loggedin} username={username} />

                </ul>
            </nav>
        )
    }
    else if (mode == "admin") {

        const [problems_visiable, setproblems_visiable] = useState(false);


        // console.log(document.URL.split("/"))
        return (
            <nav>
                <ul>
                    <li>
                        <a href="/">
                            Home
                        </a>
                    </li>
                    <li>
                        <span className="nav-divider">
                        </span>
                    </li>
                    <li>
                        <a href="/problems"
                            onMouseEnter={() => {
                                setproblems_visiable(true);
                            }}
                            onMouseLeave={() => {
                                setproblems_visiable(false)
                            }}
                        >
                            Problems
                        </a>

                        {
                            problems_visiable && (
                                <div className="dropdown-content" id="dropdown-content" style={{ fontSize: "15px", textTransform: "none" }}>
                                    <a>
                                        Problems group
                                    </a>
                                    <a>
                                        Problems types
                                    </a>
                                    <a>
                                        Licenses
                                    </a>
                                </div>
                            )
                        }
                    </li>
                    <li>
                        <a href="/submissions">
                            Submissions
                        </a>
                    </li>
                    <li>
                        <a href="/users">
                            Contests
                        </a>
                    </li>
                    <li>
                        <a href="/contests">
                            Contests
                        </a>
                    </li>
                    <li>
                        <a href="/organizations">
                            Organizations
                        </a>
                    </li>
                    <li>
                        <a href="/blogs">
                            Blogs spot
                        </a>
                    </li>
                    <Loggedined loggedin={loggedin} username={username} />
                </ul>
            </nav>
        )
    }
}

