import React from "react";
import { All_Problems } from "./problems.js";
import { Problems_Types } from "../../home/types.js";
import { Problems_Groups } from "./groups/index.js";
import { Add_Problems } from "./add.js";
export function Admin_problems() {
    let temp;
    const url = document.URL.split("//")[1].split("/").slice(1);
    if (url[2] == undefined) {
        temp = (React.createElement(All_Problems, null));
    }
    else if (url[2] == "ultility/types.js") {
        temp = (React.createElement(Problems_Types, null));
    }
    else if (url[2] == "groups") {
        temp = (React.createElement(Problems_Groups, null));
    }
    else if (url[2] == "add") {
        temp = (React.createElement(Add_Problems, null));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "admin-header" },
            React.createElement("button", { className: "admin-direct" },
                React.createElement("a", { href: "/admin/problems" }, "All Problems")),
            React.createElement("button", { className: "admin-direct" },
                React.createElement("a", { href: "/admin/problems/types" }, "Problems types")),
            React.createElement("button", { className: "admin-direct" },
                React.createElement("a", { href: "/admin/problems/groups" }, "Problems groups"))),
        React.createElement("div", { className: "admin-body" }, temp)));
}
//# sourceMappingURL=index.js.map