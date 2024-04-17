// @ts-nocheck
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client";
import { color, cookie, getdata, getGravatarURL } from "./ulti.js";

function Loggedined({ loggedin, user }) {

    // console.log(user)
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
        localStorage.clear()
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
            <a href={`/user/${user.username}`} style={{
                padding: "0px 0px 0px 10px",
            }}>
                <img src={getGravatarURL("", 24)}>
                </img>
            </a>
            <a href={`/user/${user.username}`} style={{ display: "inline-block" }} >
                Hello, <b className="italic">
                    {user.username}
                </b>
            </a>
            {
                dropdowmVisible && (

                    <>

                        <div className="dropdown-content" id="dropdown-content" style={{ marginLeft: "20px" }}>
                            {
                                (JSON.parse(localStorage.getItem("user")).role == "administrator") ?
                                    (
                                        <>
                                            <a href="/admin">Admin</a>
                                            <a href={`/user/${user.username}/edit_profile`}>Edit profile</a>
                                            <a onClick={logout} href="/">Logout</a>
                                        </>

                                    ) : (
                                        <>
                                            <a href={`/user/${user.username}/edit_profile`}>Edit profile</a>
                                            <a onClick={logout} href="/">Logout</a>
                                        </>
                                    )
                            }

                        </div>
                    </>
                )
            }
        </li >
    )
}

export default function Navigator({ mode, loggedin, user }) {
    
    // useEffect(() => {
    //     async function lmao() {
    //         const res = await getdata("get", "users", username);
    //     }

    //     lmao();
    // })

    const [problems_visiable, setproblems_visiable] = useState(false);

    return (
        <div id="nav" style={{ backgroundColor: "white", paddingTop: "20px", paddingLeft: "20px", position: "sticky" }}>
            <ul style={{ borderBottom: `5px solid ${color.theme}` }}>
                <li>
                    <a style={{ color: "white" }} href="/">
                        Home
                    </a>
                </li>

                <li>
                    <span className="nav-divider">
                    </span>
                </li>

                {
                    (mode == "normal") ? (
                        <>

                            <li>
                                <a style={{ color: "white" }} href="/problems">
                                    Problems
                                </a>
                            </li>
                            <li>
                                <a style={{ color: "white" }} href="/submissions">
                                    Submissions
                                </a>
                            </li>
                            <li>
                                <a style={{ color: "white" }} href="/users">
                                    Users
                                </a>
                            </li>
                            <li>
                                <a style={{ color: "white" }} href="/contests">
                                    Contests
                                </a>
                            </li>
                            <li>
                                <a style={{ color: "white" }} href="/about">
                                    About
                                </a>
                            </li>
                        </>

                    ) : (
                        <>
                            <li
                                onMouseEnter={() => {
                                    setproblems_visiable(true);
                                }}
                                onMouseLeave={() => {
                                    setproblems_visiable(false)
                                }}
                            >
                                <a href="/admin/problems">
                                    Problems
                                </a>
                                {
                                    problems_visiable && (
                                        <div className="dropdown-content" id="dropdown-content" style={{ fontSize: "15px", textTransform: "none" }}>
                                            <a href="/admin/problemgroups">
                                                Problem groups
                                            </a>
                                            <a href="/admin/problemtypes">
                                                Problem types
                                            </a>
                                            <a href="/admin/licenses">
                                                Licenses
                                            </a>
                                        </div>
                                    )
                                }
                            </li>
                            <li>
                                <a href="/admin/submissions">
                                    Submissions
                                </a>
                            </li>
                            <li>
                                <a href="/admin/users">
                                    Contests
                                </a>
                            </li>
                            <li>
                                <a href="/admin/contests">
                                    Contests
                                </a>
                            </li>
                            <li>
                                <a href="/admin/organizations">
                                    Organizations
                                </a>
                            </li>
                            <li>
                                <a href="/admin/blogs">
                                    Blogs spot
                                </a>
                            </li>
                        </>

                    )
                }


            </ul>
            <ul style={{ float: "right", paddingLeft: "2px", marginRight: "10px", borderBottom: `5px solid ${color.theme}` }}>
                <Loggedined loggedin={loggedin} user={user} />
            </ul>
        </div >
    )
}

