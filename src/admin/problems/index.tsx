import React, { ReactElement } from "react";
import { All_Problems } from "./problems.tsx";
import { Problems_Types } from "../../home/types.tsx";
import { Problems_Groups } from "./groups/index.tsx";
import { Add_Problems } from "./add.tsx";

export function Admin_problems() {

    let temp: any;
    const url = document.URL.split("//")[1].split("/").slice(1)

    if (url[2] == undefined) {
        temp = (<All_Problems />)
    }
    else if (url[2] == "types") {
        temp = (<Problems_Types />)
    }
    else if (url[2] == "groups") {
        temp = (<Problems_Groups />)
    }
    else if (url[2] == "add") {
        temp = (<Add_Problems />)
    }

    return (
        <>
            <div className="admin-header">
                <button className="admin-direct">
                    <a href="/admin/problems">
                        All Problems
                    </a>
                </button>
                <button className="admin-direct">
                    <a href="/admin/problems/types">
                        Problems types
                    </a>
                </button>
                <button className="admin-direct">
                    <a href="/admin/problems/groups">
                        Problems groups
                    </a>
                </button>
            </div>
            <div className="admin-body">
                {temp}
            </div>
        </>
    )
}