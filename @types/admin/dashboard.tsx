import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";




export function Admin_dashboard() {

    const [open, setopen] = useState([false, false, false, false, false, false])


    const onCLick_Header = (e: any) => {
        e.preventDefault();
        const target = e.target.className.split(" ")[0];
        console.log(target)

        if (target == "problems") {
            const temp = [...open];
            temp[0] = !temp[0];
            setopen(temp);
        }
        else if (target == "submissions") {
            const temp = [...open];
            temp[1] = !temp[1];
            setopen(temp);
        }
        else if (target == "groups") {
            const temp = [...open];
            temp[2] = !temp[2];
            setopen(temp);
        }
        else if (target == "users") {
            const temp = [...open];
            temp[3] = !temp[3];
            setopen(temp);
        }
        else if (target == "contests") {
            const temp = [...open];
            temp[4] = !temp[4];
            setopen(temp);
        }
        else if (target == "blogs-spot") {
            const temp = [...open];
            temp[5] = !temp[5];
            setopen(temp);
        }
    }

    return (

        <div className="dashboard"
            onClick={onCLick_Header}>
            {/* <div className="dashboard-content">
                <div className="dashboard-header">
                    Problems
                </div>
                <div className="adds-on">
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
            </div>

            <div className="dashboard-content">
                <div className="dashboard-header">
                    Submissions
                </div>
                <div className="adds-on">
                    <button className="admin-direct">
                        <a href="/admin/submissions">
                            All Submissions
                        </a>
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-header">
                    Groups
                </div>
                <div className="adds-on">
                    <button className="admin-direct">
                        <a href="/admin/groups">
                            All Groups
                        </a>
                    </button>
                </div>
            </div>


            <div className="dashboard-content">
                <div className="dashboard-header">
                    Users
                </div>
                <div className="adds-on">
                    <button className="admin-direct">
                        <a href="/admin/users">
                            Moderate user
                        </a>
                    </button>
                </div>
            </div>
            <div className="dashboard-content">
                <div className="dashboard-header">
                    Contests
                </div>
                <div className="adds-on">
                    <button className="admin-direct">
                        <a href="/admin/contests">
                            All Contest
                        </a>
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-header">
                    Blogs Spot
                </div>
                <div className="adds-on">
                    <button className="admin-direct">
                        <a href="/admin/blogs">
                            All blogs
                        </a>
                    </button>
                </div>
            </div> */}

            <div>
                <div style={{
                    display: 'flex'
                }}>
                    <a
                        style={{ cursor: "pointer" }}
                    >
                        Problems
                    </a>

                    <div
                        style={{
                            cursor: "pointer",
                            paddingLeft: "150px"
                        }}
                        onClick={(e) => { window.location.href = "/admin/problems/add" }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <a style={{
                            paddingLeft: "5px"
                        }}>
                            Add
                        </a>
                    </div>
                    <div
                        style={{
                            cursor: "pointer",
                            paddingLeft: "10px"
                        }}
                        onClick={(e) => { window.location.href = "/admin/problems" }}
                    >
                        <FontAwesomeIcon icon={faEye} />
                        <a style={{

                            paddingLeft: "5px"
                        }}>
                            View
                        </a>
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>


        </div >
    )
}