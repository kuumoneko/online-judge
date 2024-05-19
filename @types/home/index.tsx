import React from "react"
import { HomePage } from "./home.js"
import { User } from "../@classes/type.js"
// import { Userr } from "../user.js"
import { Userring } from "../home/account.js"
import { Userr } from "./user/index.js"
import { Blog } from "./blogs.js"
import { Home_Users } from "./users/users.js"
import { Home_Groups } from "./users/groups.js"
import { Edit_blog } from "./user/edit_blog.js"
import { About } from "./about.js"



export function Home({ users }: { users: User[] }) {
    const url = document.URL.split("//")[1].split("/")
    // console.log(url[1] == "")

    if (url[1] == "") {
        return (
            <HomePage />
        )
    }
    else if (url[1] == "user") {
        if (url[2] == undefined) {
            window.location.href = "/account"
        }
        // console.log(url[3])
        return (
            <Userr mode={url[3]} users={users} user={JSON.parse(localStorage.getItem("user") as string)} />
        )
    }
    else if (url[1] == "account") {
        return (
            <Userring />
        )
    }
    else if (url[1] == "account") {
        return (
            <Userring />
        )
    }
    else if (url[1] == "blogs") {
        if (url[3] == "edit") {

            return (
                <Edit_blog user={JSON.parse(localStorage.getItem("user") as string)} blog={url[2]} />
            )
        }
        return (
            <Blog url={url} />
        )
    }
    else if (url[1] == "users") {
        return (
            <Home_Users />
        )
    }
    else if (url[1] == "groups") {
        return (
            <Home_Groups />
        )
    }
    else if (url[1] == "about") {
        return (
            <About />
        )
    }

}