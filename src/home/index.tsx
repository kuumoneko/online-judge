import React from "react"
import { HomePage } from "./home.tsx";
import { geturl } from "ulti";
import { Userring } from "../home/account/index.tsx";
import { Userr } from "./user/index.tsx";
import { Blog } from "./blogs.tsx";
import { Home_Users } from "./users/users.tsx";
import { Home_Groups } from "./users/groups.tsx";
import { Edit_blog } from "./user//blogs/edit.tsx";
import { About } from "./about.tsx";
import { Verify_user } from "./verify.tsx";
import { ForgotPassword } from "./user/forgot_password.tsx";
import { Problems_info as Problems } from "./problems/problems.tsx";
import { Problem } from "./problem/index.tsx";
import { Submissions } from "./submissions/index.tsx";

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
            <Problems />
        )
    }
    else if (url[0] == "problem") {
        return (
            <Problem />
        )
    }
    else if (url[0] == "submissions") {
        return (
            <Submissions />
        )
    }
    else {
        return (
            <></>
        )
    }

}