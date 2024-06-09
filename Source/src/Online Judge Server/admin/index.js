import React from "react";
import { Admin_contests } from "./contests/index.js";
import { Admin_problems } from "./problems/index.js";
import { Admin_groups } from "./groups/index.js";
import { Admin_users } from "./users/index.js";
import { Admin_dashboard } from "./dashboard.js";
import { Admin_Blogs } from "./blogs/index.js";
export function Admin() {
    const url = document.URL.split("//")[1].split("/").slice(1);
    let temp;
    if (url[1] == undefined) {
        temp = (React.createElement(Admin_dashboard, null));
    }
    else if (url[1] == "contests") {
        temp = (React.createElement(Admin_contests, null));
    }
    else if (url[1] == "problems") {
        temp = (React.createElement(Admin_problems, null));
    }
    else if (url[1] == "groups") {
        temp = (React.createElement(Admin_groups, null));
    }
    else if (url[1] == "users") {
        temp = (React.createElement(Admin_users, null));
    }
    else {
        temp = (React.createElement(Admin_Blogs, null));
    }
    return (React.createElement("div", { className: "admin-container" }, temp));
}
//# sourceMappingURL=index.js.map