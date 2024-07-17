import React from "react";
import { Nav_Problems } from "./nav_bar/problems.js";
import { Nav_Submissions } from "./nav_bar/submissions.js";
import { Nav_Users } from "./nav_bar/users.js";
import { Nav_Contests } from "./nav_bar/contests.js";
import { Nav_Themes } from "./user/thememode.js";
import { Nav_User } from "./user/user.js";
import { SearchBar } from "./search_bar/searchBar.js";
export function Navigator() {
    return (React.createElement("div", { className: "navigator-container" },
        React.createElement("div", { className: "navigator" },
            React.createElement("div", { style: {
                    display: "flex"
                } },
                React.createElement("div", { className: "navigator-fi", style: {
                        cursor: "pointer",
                        paddingLeft: "5px"
                    }, onClick: (e) => {
                        window.location.href = "/";
                    } },
                    React.createElement("img", { src: "https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/React/React.png", height: 35, width: 90 })),
                React.createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    } },
                    React.createElement("div", { style: {
                            display: "block",
                            height: "85%",
                            width: "3px",
                            marginLeft: "5px",
                            backgroundColor: "gray"
                        } })),
                React.createElement(Nav_Problems, null),
                React.createElement(Nav_Submissions, null),
                React.createElement(Nav_Users, null),
                React.createElement(Nav_Contests, null),
                React.createElement("div", { className: "navigator-fi" },
                    React.createElement("a", { href: "/about" }, "ABOUT"))),
            React.createElement(SearchBar, null),
            React.createElement("div", { style: {
                    display: "flex",
                    flexDirection: "row"
                } },
                React.createElement(Nav_Themes, null),
                React.createElement(Nav_User, null)))));
}
//# sourceMappingURL=index.js.map