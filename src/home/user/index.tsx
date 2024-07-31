import React from "react";
import { Profile } from "./settings/profile.tsx";
import { Editprofile } from "./settings/edit.tsx";
import { Blog_info as Blog } from "./blogs/blogs.tsx";
import { ChangePassword } from "./settings/change_pass.tsx";




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