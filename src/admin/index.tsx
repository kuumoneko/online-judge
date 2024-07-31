import React, { ReactElement } from "react"
import { Admin_contests } from "./contests/index.tsx";
import { Admin_problems } from "./problems/index.tsx";
import { Admin_groups } from "./groups/index.tsx";
import { Admin_users } from "./users/index.tsx";
import { Admin_dashboard } from "./dashboard.tsx";
import { Admin_Blogs } from "./blogs/index.tsx";


export function Admin() {

    const url = document.URL.split("//")[1].split("/").slice(1)

    let temp: any;

    if (url[1] == undefined) {
        temp = (<Admin_dashboard />)
    }
    else if (url[1] == "contests") {
        temp = (<Admin_contests />)

    }
    else if (url[1] == "problems") {
        temp = (<Admin_problems />)

    }
    else if (url[1] == "groups") {
        temp = (<Admin_groups />)

    }
    else if (url[1] == "users") {
        temp = (<Admin_users />)

    }
    else {
        temp = (<Admin_Blogs />)
    }



    return (
        <div className="admin-container">
            {temp}
        </div>
    )
}