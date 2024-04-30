import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { color, color_themes, getGravatarURL } from "./ulti.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCode, faFolder, faHammer, faHome, faInfo, faRightFromBracket, faTerminal, faUser, faUserGroup, faUsers, } from "@fortawesome/free-solid-svg-icons";
import { User_role } from "./classes/enum.js";
export function Navigator({ mode }) {
    const themes = color[JSON.parse(localStorage.getItem("user")).themes.mode];
    const user = JSON.parse(localStorage.getItem("user"));
    const [opened, setopen] = useState(false);
    useEffect(() => {
        const nav_circle = document.getElementsByClassName("nav-circle");
        for (let i = 0; i < nav_circle.length; i++) {
            nav_circle[i].style.transform = (opened) ? `translate(${lmao.find(item => item.id == nav_circle[i].id).x}px, ${lmao.find(item => item.id == nav_circle[i].id).y}px)` : "";
            nav_circle[i].style.left = (opened) ? "44.5%" : "50%";
        }
    }, [opened]);
    let nav;
    if (mode == "admin") {
        nav = [
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
            {
                id: "Me",
                href: (user.username == undefined || user.username == null) ? "/user" : `/user/${user.username}`,
                icon: faUser
            }
        ];
    }
    else if (mode == "normal") {
        nav = [
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
        nav.push({
            id: "logout",
            href: "/",
            icon: faRightFromBracket
        });
    }
    const radius = 120;
    const anglePerDiv = (Math.PI * 2) / nav.length / 2;
    const lmao = [];
    const divs = [];
    nav.reverse().forEach((item, index) => {
        const angle = index * anglePerDiv + Math.PI * 1 / 10 - ((nav.length == 7) ? 1 / 11 : 1 / 19);
        const xPos = radius + radius * Math.cos(angle) - 20;
        const yPos = radius - radius * (1 - Math.sin(angle)) - 65;
        lmao.push({ x: xPos, y: yPos, id: item.id });
        divs.push(React.createElement("div", { className: "nav-circle", id: item.id, title: item.id, style: {
                borderColor: color_themes,
                backgroundColor: color_themes,
            }, onClick: (e) => {
                if (e.target.id == "logout") {
                    Cookies.remove("user");
                    Cookies.remove("remember");
                    localStorage.clear();
                }
                window.location.href = item.href;
            } },
            React.createElement(FontAwesomeIcon, { icon: item.icon, id: item.id })));
    });
    return (React.createElement("div", { className: "navigator", style: { backgroundColor: themes.content }, onMouseLeave: () => setopen(false) },
        React.createElement("div", { className: "nav-center", style: {
                width: (!opened || !(user.role == User_role.administrator || user.role == User_role.moderator)) ? "50px" : "100px",
                borderColor: color_themes,
                backgroundColor: color_themes,
                zIndex: "10"
            }, onClick: (e) => {
                setopen(true);
            } },
            React.createElement("div", { style: (opened && (user.role == User_role.administrator || user.role == User_role.moderator)) ?
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
                    } : {}, title: "Home", onClick: () => {
                    if (opened) {
                        window.location.href = "/";
                    }
                } }, (opened || user.username == undefined) ?
                (React.createElement(FontAwesomeIcon, { icon: (opened) ? faHome : faBars }))
                :
                    (React.createElement("img", { src: getGravatarURL(user.email, 50), style: { borderRadius: "100px" } }))),
            (opened && (user.role == User_role.administrator || user.role == User_role.moderator)) && (React.createElement("div", { style: (opened) ?
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
                    } : {}, onClick: () => {
                    if (opened) {
                        window.location.href = "/admin";
                    }
                }, title: "Admin" },
                React.createElement(FontAwesomeIcon, { icon: faHammer })))),
        divs.map((item) => (React.createElement(React.Fragment, null, item)))));
}
//# sourceMappingURL=navigator.js.map