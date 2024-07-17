import React from "react";
import { HomePage } from "./home.js";
import { geturl } from "types";
import { Userring } from "../home/account/index.js";
import { Userr } from "./user/index.js";
import { Blog } from "./blogs.js";
import { Home_Users } from "./users/users.js";
import { Home_Groups } from "./users/groups.js";
import { Edit_blog } from "./user//blogs/edit.js";
import { About } from "./about.js";
import { Verify_user } from "./verify.js";
import { ForgotPassword } from "./user/forgot_password.js";
import { Problem } from "./problems/problems.js";
export function Home() {
    const url = geturl();
    if (url[0] == "") {
        return (React.createElement(HomePage, null));
    }
    else if (url[0] == "user") {
        return (React.createElement(Userr, { mode: url[2] }));
    }
    else if (url[0] == "account") {
        return (React.createElement(Userring, null));
    }
    else if (url[0] == "blogs") {
        if (url[2] == "edit") {
            return (React.createElement(Edit_blog, { user: JSON.parse(localStorage.getItem("user")), blog: url[1] }));
        }
        return (React.createElement(Blog, { url: url }));
    }
    else if (url[0] == "users") {
        return (React.createElement(Home_Users, null));
    }
    else if (url[0] == "groups") {
        return (React.createElement(Home_Groups, null));
    }
    else if (url[0] == "about") {
        return (React.createElement(About, null));
    }
    else if (url[0] == "verify") {
        return (React.createElement(Verify_user, null));
    }
    else if (url[0] == "forget_password") {
        return (React.createElement(ForgotPassword, null));
    }
    else if (url[0] == "problems") {
        return (React.createElement(Problem, null));
    }
}
//# sourceMappingURL=index.js.map