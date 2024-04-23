// @ts-nocheck
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { color } from "./ulti.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCode,
    faFolder,
    faHome,
    faInfo,
    faRightFromBracket,
    faTerminal,
    faUser,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

export function Navigator({ mode }) {
    const themes = color[JSON.parse(localStorage.getItem("user")).themes.mode];
    const user = JSON.parse(localStorage.getItem("user"));
    const [opened, setopen] = useState(false);

    // console.log(color[user.themes.mode].font)

    useEffect(() => {
        // console.log(opened)

        const nav_circle = document.getElementsByClassName("nav-circle")

        for (let i = 0; i < nav_circle.length; i++) {
            nav_circle[i].style.transform = (opened) ? `translate(${lmao.find(item => item.id == nav_circle[i].id).x}px, ${lmao.find(item => item.id == nav_circle[i].id).y}px)` : "";
            nav_circle[i].style.left = (opened) ? "44.5%" : "50%";
        }
    }, [opened])

    const nav = [
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

    if (user.username != undefined && user.username != null) {
        nav.push({
            id: "Log out",
            href: "",
            icon: faRightFromBracket
        })

    }
    // const circumference = 2 * Math.PI * radius;
    const radius = 120;
    const anglePerDiv = (Math.PI * 2) / nav.length / 2;
    // console.log(anglePerDiv)

    const lmao = []
    const divs = [];
    nav.reverse().forEach((item, index) => {
        const angle = index * anglePerDiv + Math.PI * 1 / 10 - ((nav.length == 7) ? 1 / 11 : 1 / 19);
        // console.log(angle);
        const xPos = radius + radius * Math.cos(angle) - 20;
        const yPos = radius - radius * (1 - Math.sin(angle)) - 65;

        // console.log(xPos, ' ', yPos)
        lmao.push({ x: xPos, y: yPos, id: item.id })
        divs.push(
            <div
                className="nav-circle"
                id={item.id}
                title={item.id}
                style={{
                    borderColor: color.theme,
                    backgroundColor: color.theme,
                    // transform: `translate(${xPos}px, ${yPos}px)`
                }}
                onClick={(e) => {
                    // console.log(e.target.id)
                    if (e.target.id == "logout") {
                        Cookies.remove("user");
                        Cookies.remove("remember");
                        localStorage.clear();
                    }

                    window.location.href = item.href;
                }}
            >
                <FontAwesomeIcon icon={item.icon} />
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
                title="Home"
                style={{
                    borderColor: color.theme,
                    backgroundColor: color.theme,
                    zIndex: "10"
                }}
                onClick={(e) => {
                    if (opened)
                        window.location.href = "/";

                    setopen(true);

                }}
            >
                <FontAwesomeIcon icon={(opened) ? faHome : faBars} />
            </div>

            {
                divs.map((item) => (
                    <>
                        {
                            item
                        }
                    </>
                ))
            }

        </div>
    );
}
