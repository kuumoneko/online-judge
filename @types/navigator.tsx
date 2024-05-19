// @ts-nocheck
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { color, color_themes, getGravatarURL } from "./@classes/ultility.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBlog,
    faCode,
    faFolder,
    faHammer,
    faHome,
    faInfo,
    faRightFromBracket,
    faTerminal,
    faUser,
    faUserGroup,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { User_role } from "./@classes/enum.js";

export function Navigator({ mode }) {

    const themes = color[JSON.parse(localStorage.getItem("user")).themes.mode];
    const user = JSON.parse(localStorage.getItem("user"));
    const [opened, setopen] = useState(false);


    useEffect(() => {
        // console.log(opened)

        const nav_circle: HTMLElement[] = document.getElementsByClassName("nav-circle")
        // console.log(nav_circle)

        if (opened) {
            for (let i = 0; i < nav_circle.length; i++) {
                // console.log(nav_circle[i].attributes[1].value)
                nav_circle[i].style.rotate = (nav_circle[i].attributes[1].value == "right") ? "-90deg" : "90deg";
            }
        }
        else {
            for (let i = 0; i < nav_circle.length; i++) {
                nav_circle[i].style.rotate = "0deg";
            }
        }

    }, [opened])


    let left_nav = [],
        right_nav = [];


    if (mode == "admin") {
        left_nav = [
            {
                id: "Problems",
                href: "/admin/problems",
                icon: faFolder,
            },
            {
                id: "Groups",
                href: "/admin/groups",
                icon: faUserGroup,
            },
            {
                id: "Users",
                href: "/admin/users",
                icon: faUsers,
            },
            {
                id: "Contests",
                href: "/admin/contests",
                icon: faCode,
            },
        ];
        right_nav = [
            {
                id: "Blogs",
                href: "/admin/blogs",
                icon: faBlog
            },
            {
                id: "About",
                href: "/about",
                icon: faInfo,
            },
            {
                id: "Me",
                href: (user.username == undefined || user.username == null) ? "/user" : `/user/${user.username}`,
                icon: faUser
            }
        ];

    }
    else if (mode == "normal") {

        left_nav = [
            {
                id: "Problems",
                href: "/problems",
                icon: faFolder,
            },
            {
                id: "Submissions",
                href: "/submissions",
                icon: faTerminal,
            },
            {
                id: "Users",
                href: "/users",
                icon: faUsers,
            },
            {
                id: "Contests",
                href: "/contests",
                icon: faCode,
            },
        ];

        right_nav = [
            {
                id: "About",
                href: "/about",
                icon: faInfo,
            },
            {
                id: "Me",
                href: (user.username == undefined || user.username == null) ? "/user" : `/user/${user.username}`,
                icon: faUser
            }
        ];


    }

    if (user.username != undefined && user.username != null) {
        right_nav.push({
            id: "logout",
            href: "/",
            icon: faRightFromBracket
        })
    }
    // const circumference = 2 * Math.PI * radius;
    // const radius = 120;
    // const anglePerDiv = (Math.PI * 2) / nav.length / 2;
    // // console.log(anglePerDiv)

    // const lmao = []
    const divs = [];

    left_nav.reverse().forEach((item, index) => {

        const location = `translate(-50% , ${index * 150 + 450}%)`;

        divs.push(
            <div
                className="nav-circle"
                name="left"
                id={item.id}
                title={item.id}
                key={`left_${index + 1}`}
                style={{
                    borderColor: color_themes,
                    backgroundColor: color_themes,
                    zIndex: "0",
                    transform: location,
                    // rotate: "90deg"
                }}
                onClick={(e) => {
                    // console.log(e.target.id)
                    if (e.target.id == "logout") {
                        Cookies.remove("user");
                        Cookies.remove("remember");
                        localStorage.clear();
                        window.location.reload();
                        return;
                    }

                    window.location.href = item.href;
                }}
            >
                <FontAwesomeIcon icon={item.icon} id={item.id} style={{
                    rotate: "270deg"
                }} />
            </div>
        );
    })

    right_nav.forEach((item, index) => {

        const location = `translate(50% , ${index * 150 + 350}%)`;

        divs.push(
            <div
                className="nav-circle"
                name="right"
                id={item.id}
                title={item.id}
                key={`right_${index + 1}`}
                style={{
                    borderColor: color_themes,
                    backgroundColor: color_themes,
                    zIndex: "0",
                    transform: location,
                    // rotate: "-90deg"
                }}
                onClick={(e) => {
                    // console.log(e.target.id)
                    if (e.target.id == "logout") {
                        Cookies.remove("user");
                        Cookies.remove("remember");
                        localStorage.clear();
                        window.location.reload();
                        return;
                    }

                    window.location.href = item.href;
                }}
            >
                <FontAwesomeIcon icon={item.icon} id={item.id} style={{
                    rotate: "-270deg"
                }} />
            </div>
        );
    })

    return (
        <div
            className="navigator"
            style={{ backgroundColor: themes.content }}
            onMouseLeave={() => setopen(false)}
        >
            <div
                className="nav-center"
                // title="Home"
                style={{
                    width: (!opened || !(user.role == User_role.administrator || user.role == User_role.moderator)) ? "50px" : "100px",
                    borderColor: color_themes,
                    backgroundColor: color_themes,
                    zIndex: "10"
                }}
                onClick={(e) => {
                    setopen(true);
                }}
            >
                <div style={(opened && (user.role == User_role.administrator || user.role == User_role.moderator)) ?
                    {
                        borderRight: "1px solid black",
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50px",
                        width: "50px",
                        position: "absolute",
                        left: "24%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                    } : {}
                }
                    title="Home"
                    onClick={() => {
                        if (opened) {
                            window.location.href = "/";
                        }
                    }}
                >
                    {
                        (opened || user.username == undefined) ?
                            (
                                <FontAwesomeIcon icon={(opened) ? faHome : faBars} />
                            )
                            :
                            (
                                <img src={getGravatarURL(user.email, 50)} style={{ borderRadius: "100px" }}>
                                </img>


                            )
                    }

                </div>


                {
                    (opened && (user.role == User_role.administrator || user.role == User_role.moderator)) && (
                        <div style={(opened) ?
                            {
                                borderLeft: "1px solid black",
                                borderRadius: "50px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "50px",
                                width: "50px",
                                position: "absolute",
                                left: "76%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            } : {}
                        }
                            onClick={() => {
                                if (opened) {
                                    window.location.href = "/admin";
                                }
                            }}
                            title="Admin"

                        >
                            <FontAwesomeIcon icon={faHammer} />
                        </div>)
                }

            </div>

            {
                divs.map((item) => (
                    item
                )
                )
            }

        </div>
    );
}