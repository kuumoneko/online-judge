import { color, color_themes, User_role } from 'types';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
export function Nav_Users() {
    const [touch, settouch] = useState(false);
    // const user_role = JSON.parse(localStorage.getItem("user") as string).role;
    // const user: User = JSON.parse(localStorage.getItem("user") as string)
    const theme = Cookies.get("theme");
    const role = localStorage.getItem("role");
    return (React.createElement("div", null,
        React.createElement("div", {
            className: 'navigator-fi', onMouseEnter: (e) => {
                settouch(true);
            }, onMouseLeave: (e) => {
                settouch(false);
            }
        },
            React.createElement("a", { href: "/users" }, "USERS")),
        (touch && (role === User_role.administrator || role == User_role.moderator)) && (React.createElement("div", {
            style: {
                width: "100%",
                height: "40px",
                backgroundColor: color[theme].content,
                // borderLeft: `5px solid ${color_themes}`,
                zIndex: "1",
                position: "relative"
            }, onMouseEnter: (e) => {
                settouch(true);
            }, onMouseLeave: (e) => {
                settouch(false);
            }
        },
            React.createElement("div", {
                style: {
                    height: "40px",
                    backgroundColor: color[theme].content,
                    borderLeft: `5px solid ${color_themes}`,
                    zIndex: "1px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center"
                }
            }, "All"),
            React.createElement("div", {
                style: {
                    height: "40px",
                    backgroundColor: color[theme].content,
                    borderLeft: `5px solid ${color_themes}`,
                    zIndex: "1px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center"
                }
            }, "Types"),
            React.createElement("div", {
                style: {
                    height: "40px",
                    backgroundColor: color[theme].content,
                    borderLeft: `5px solid ${color_themes}`,
                    zIndex: "1px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center"
                }
            }, "Groups")))));
}
//# sourceMappingURL=users.js.map