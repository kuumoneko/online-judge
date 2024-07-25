import { color_themes, get_rank_color } from "ultility/color.js";
import { User_role } from "ultility/enum.js";
import { getdata } from "ultility/ulti.js";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
export function Nav_User() {
    const [touch, settouch] = useState(false);
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const rank = Number(localStorage.getItem("rank"));
    const [logout, setlogout] = useState(false);
    useEffect(() => {
        async function lmao() {
            if (logout == false)
                return;
            Cookies.remove("remember");
            const res = await getdata("logout", "", "");
            console.log(res);
            localStorage.clear();
            window.location.reload();
        }
        lmao();
    }, [logout]);
    return (React.createElement("div", null,
        React.createElement("div", { 
            // className='navigator-fi'
            style: {
                verticalAlign: "middle",
                paddingLeft: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
                paddingRight: "15px"
            }, onMouseEnter: (e) => {
                settouch(true);
            }, onMouseLeave: (e) => {
                settouch(false);
            } }, (username) ? (React.createElement("a", { href: `/user/${username}` },
            `Hello, `,
            React.createElement("a", { className: 'font-bold', style: {
                    color: get_rank_color(rank, User_role.user)
                } }, username))) : (React.createElement("a", { href: "/account" }, "Login or Signup"))),
        (touch && username) && (React.createElement("div", { style: {
                width: "100%",
                height: "40px",
                backgroundColor: "black",
                color: "white",
                zIndex: "1",
                position: "relative"
            }, onMouseEnter: (e) => {
                settouch(true);
            }, onMouseLeave: (e) => {
                settouch(false);
            } },
            (role === User_role.administrator || role == User_role.moderator) && (React.createElement("div", { style: {
                    height: "40px",
                    backgroundColor: "black",
                    borderLeft: `5px solid ${color_themes}`,
                    zIndex: "1px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    cursor: "pointer"
                } },
                React.createElement("a", { href: "/admin" }, "Admin"))),
            React.createElement("div", { style: {
                    height: "40px",
                    backgroundColor: "black",
                    borderLeft: `5px solid ${color_themes}`,
                    zIndex: "1px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    cursor: "pointer"
                } },
                React.createElement("a", { href: `/user/${username}/edit_profile` }, "Edit profile")),
            React.createElement("div", { style: {
                    height: "40px",
                    backgroundColor: "black",
                    borderLeft: `5px solid ${color_themes}`,
                    zIndex: "1px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    cursor: "pointer"
                }, onClick: (e) => {
                    setlogout(true);
                } }, "Log out")))));
}
//# sourceMappingURL=user.js.map