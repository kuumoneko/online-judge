import React from "react"
import { HomePage } from "./home.js"
import { geturl, User } from "types"
import { Userring } from "../home/account/index.js"
import { Userr } from "./user/index.js"
import { Blog } from "./blogs.js"
import { Home_Users } from "./users/users.js"
import { Home_Groups } from "./users/groups.js"
import { Edit_blog } from "./user//blogs/edit.js"
import { About } from "./about.js"
import { Verify_user } from "./verify.js"
import { ForgotPassword } from "./user/forgot_password.js"
import { Problem } from "./problems/problems.js"


export function Home() {
    const url = geturl();



    if (url[0] == "") {
        return (
            <HomePage />
        )
    }
    else if (url[0] == "user") {
        return (
            <Userr mode={url[2]} />
        )
    }
    else if (url[0] == "account") {
        return (
            <Userring />
        )
    }
    else if (url[0] == "blogs") {
        if (url[2] == "edit") {

            return (
                <Edit_blog user={JSON.parse(localStorage.getItem("user") as string)} blog={url[1]} />
            )
        }
        return (
            <Blog url={url} />
        )
    }
    else if (url[0] == "users") {
        return (
            <Home_Users />
        )
    }
    else if (url[0] == "groups") {
        return (
            <Home_Groups />
        )
    }
    else if (url[0] == "about") {
        return (
            <About />
        )
    }
    else if (url[0] == "verify") {
        return (
            <Verify_user />
        )
    }
    else if (url[0] == "forget_password") {
        return (
            <ForgotPassword />
        )
    }
    else if (url[0] == "problems") {
        return (
            <Problem />
        )
    }

}