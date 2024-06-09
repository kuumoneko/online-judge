import React from "react";
import { Profile } from "./profile.js";
import { Editprofile } from "./edit_profile.js";
import { Blog } from "./blogs.js";
export function Userr({ mode, users, user }) {
    const username = document.URL.split("//")[1].split("/")[2] || user.username;
    if (mode == undefined) {
        return (React.createElement(Profile, { user: users.find(item => item.username == username) }));
    }
    else if (mode == "edit_profile") {
        return (React.createElement(Editprofile, { user: user }));
    }
    else if (mode == "blogs") {
        return (React.createElement(Blog, { url: document.URL.split("//")[1].split("/") }));
    }
    else if (mode == "statics") {
        return (React.createElement(Editprofile, { user: user }));
    }
    return (React.createElement(React.Fragment, null));
}
//# sourceMappingURL=index.js.map