import React from "react";
import { Profile } from "./profile.js";
import { Editprofile } from "./edit_profile.js";
import { User } from "../../@classes/type.js";
import { Blog } from "./blogs.js";




export function Userr({ mode, users, user }: { mode: string, users: User[], user: User }) {

    const username = document.URL.split("//")[1].split("/")[2] || user.username
    if (mode == undefined) {
        return (
            <Profile users={users} user={users.find(item => item.username == username) as User} />
        )
    }
    else if (mode == "edit_profile") {
        return (
            <Editprofile user={user} />
        )
    }
    else if (mode == "blogs") {
        return (
            <Blog url={document.URL.split("//")[1].split("/")} />
        )
    }
    else if (mode == "statics") {
        return (
            <Editprofile user={user} />
        )
    }
    return (
        <>
        </>
    )
}