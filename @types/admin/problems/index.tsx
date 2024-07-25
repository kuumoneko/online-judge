import React, { ReactElement } from "react";
import { All_Problems } from "./problems.js";
import { Problems_Types } from "../../home/types.js";
import { Problems_Groups } from "./groups/index.js";
import { Add_Problems } from "./add.js";

export function Admin_problems() {

    let temp: any;
    const url = document.URL.split("//")[1].split("/").slice(1)

    if (url[2] == undefined) {
        temp = (<All_Problems />)
    }
    else if (url[2] == "ultility/types.js") {
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