import React from "react";
import { HomePage } from "./home.js";
import { Userring } from "../home/account.js";
import { Userr } from "./user/index.js";
import { Blog } from "./blogs.js";
import { Home_Users } from "./users/users.js";
import { Home_Groups } from "./users/groups.js";
import { Edit_blog } from "./user/edit_blog.js";
import { About } from "./about.js";
export function Home({ users }) {
    const url = document.URL.split("//")[1].split("/");
    if (url[1] == "") {
        return (React.createElement(HomePage, null));
    }
    else if (url[1] == "user") {
        if (url[2] == undefined) {
            window.location.href = "/account";
        }
        return (React.createElement(Userr, { mode: url[3], users: users, user: JSON.parse(localStorage.getItem("user")) }));
    }
    else if (url[1] == "account") {
        return (React.createElement(Userring, null));
    }
    else if (url[1] == "account") {
        return (React.createElement(Userring, null));
    }
    else if (url[1] == "blogs") {
        if (url[3] == "edit") {
            return (React.createElement(Edit_blog, { user: JSON.parse(localStorage.getItem("user")), blog: url[2] }));
        }
        return (React.createElement(Blog, { url: url }));
    }
    else if (url[1] == "users") {
        return (React.createElement(Home_Users, null));
    }
    else if (url[1] == "groups") {
        return (React.createElement(Home_Groups, null));
    }
    else if (url[1] == "about") {
        return (React.createElement(About, null));
    }
}
//# sourceMappingURL=index.js.map