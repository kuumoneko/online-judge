import React from "react";
import { Profile } from "./settings/profile.js";
import { Editprofile } from "./settings/edit.js";
import { Blog } from "./blogs/blogs.js";
import { ChangePassword } from "./settings/change_pass.js";
export function Userr({ mode }) {
    if (mode == undefined) {
        return (React.createElement(Profile, null));
    }
    else if (mode == "edit_profile") {
        return (React.createElement(Editprofile, null));
    }
    else if (mode == "blogs") {
        return (React.createElement(Blog, null));
    }
    else if (mode == "statics") {
        return (React.createElement(React.Fragment, null));
    }
    else if (mode == "change_password") {
        return (React.createElement(ChangePassword, null));
    }
    return (React.createElement(React.Fragment, null));
}
//# sourceMappingURL=index.js.map