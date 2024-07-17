import React from "react";
import { Profile } from "./settings/profile.js";
import { Editprofile } from "./settings/edit.js";
import { Blog } from "./blogs/blogs.js";
import { ChangePassword } from "./settings/change_pass.js";




export function Userr({ mode }: { mode: string }) {

    if (mode == undefined) {
        return (
            <Profile />
        )
    }
    else if (mode == "edit_profile") {
        return (
            <Editprofile />
        )
    }
    else if (mode == "blogs") {
        return (
            <Blog />
        )
    }
    else if (mode == "statics") {
        return (
            <></>
        )
    }
    else if (mode == "change_password") {
        return (
            <ChangePassword />
        )
    }
    return (
        <>
        </>
    )
}