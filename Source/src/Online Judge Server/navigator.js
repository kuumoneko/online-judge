var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { color, color_themes, getdata, getGravatarURL, User_role } from "online-judge-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBlog, faCode, faFolder, faHammer, faHome, faInfo, faRightFromBracket, faTerminal, faUser, faUserGroup, faUsers, } from "@fortawesome/free-solid-svg-icons";
export function Navigator({ mode }) {
    const themes = color[JSON.parse(localStorage.getItem("user")).themes.mode];
    const user = JSON.parse(localStorage.getItem("user"));
    const [opened, setopen] = useState(false);
    const [logout, setlogout] = useState(false);
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield getdata("logout", "", "");
                console.log(res);
            });
        }
        if (logout == true) {
            lmao();
        }
    }, [logout]);
    useEffect(() => {
        const nav_circle = document.getElementsByClassName("nav-circle");
        if (opened) {
            for (let i = 0; i < nav_circle.length; i++) {
                nav_circle[i].style.rotate = (nav_circle[i].attributes[1].value == "right") ? "-90deg" : "90deg";
            }
        }
        else {
            for (let i = 0; i < nav_circle.length; i++) {
                nav_circle[i].style.rotate = "0deg";
            }
        }
    }, [opened]);
    let left_nav = [], right_nav = [];
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
        });
    }
    const divs = [];
    left_nav.reverse().forEach((item, index) => {
        const location = `translate(-50% , ${index * 150 + 450}%)`;
        divs.push(React.createElement("div", { className: "nav-circle", name: "left", id: item.id, title: item.id, key: `left_${index + 1}`, style: {
                borderColor: color_themes,
                backgroundColor: color_themes,
                zIndex: "0",
                transform: location,
            }, onClick: (e) => {
                e.preventDefault();
                window.location.href = item.href;
            } },
            React.createElement(FontAwesomeIcon, { icon: item.icon, id: item.id, style: {
                    rotate: "270deg"
                } })));
    });
    right_nav.forEach((item, index) => {
        const location = `translate(50% , ${index * 150 + 350}%)`;
        divs.push(React.createElement("div", { className: "nav-circle", name: "right", id: item.id, title: item.id, key: `right_${index + 1}`, style: {
                borderColor: color_themes,
                backgroundColor: color_themes,
                zIndex: "0",
                transform: location,
            }, onClick: (e) => __awaiter(this, void 0, void 0, function* () {
                if (e.target.id == "logout") {
                    Cookies.remove("remember");
                    const res = yield getdata("logout", "", "");
                    console.log(res);
                    localStorage.clear();
                    window.location.reload();
                    return;
                }
                window.location.href = item.href;
            }) },
            React.createElement(FontAwesomeIcon, { icon: item.icon, id: item.id, style: {
                    rotate: "-270deg"
                } })));
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
        divs.map((item) => (item))));
}
//# sourceMappingURL=navigator.js.map