import React, { useState } from "react";




export function Admin_dashboard() {

    const [open, setopen] = useState([false, false, false, false, false, false])


    const onCLick_Header = (e: any) => {
        e.preventDefault();
        const target = e.target.className.split(" ")[1];

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

        <div className="dashboard">
            <div className="dashboard-content">
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
            </div>
        </div>


        // <>
        //     <div className="admin-header" onClick={onCLick_Header}>
        //         <div className="admin-header problems">
        //             Problems
        //         </div>
        //         {
        //             open[0] && (
        //                 <div className="admin-header adds-on">
        //                     <button className="admin-direct">
        //                         <a href="/admin/problems">
        //                             All Problems
        //                         </a>
        //                     </button>
        //                     <button className="admin-direct">
        //                         <a href="/admin/problems/types">
        //                             Problems types
        //                         </a>
        //                     </button>
        //                     <button className="admin-direct">
        //                         <a href="/admin/problems/groups">
        //                             Problems groups
        //                         </a>
        //                     </button>
        //                 </div>
        //             )
        //         }

        //         <div className="admin-header submissions">
        //             Submissions
        //         </div>
        //         {
        //             open[1] && (
        //                 <div className="admin-header adds-on">
        //                     <button className="admin-direct">
        //                         <a href="/admin/submissions">
        //                             All Submissions
        //                         </a>
        //                     </button>
        //                 </div>
        //             )
        //         }

        //         <div className="admin-header groups">
        //             Groups
        //         </div>

        //         {
        //             open[2] && (
        //                 <div className="admin-header adds-on">
        //                     <div className="add-group">
        //                         Add group
        //                     </div>
        //                 </div>
        //             )
        //         }

        //         <div className="admin-header users">
        //             Users
        //         </div>

        //         {
        //             open[3] && (
        //                 <div className="admin-header adds-on">
        //                     <div className="moderate user">
        //                         Moderate user
        //                     </div>
        //                 </div>
        //             )
        //         }

        //         <div className="admin-header contests">
        //             Contest
        //         </div>

        //         {
        //             open[4] && (
        //                 <div className="admin-header adds-on">
        //                     <div className="add-contest">
        //                         <a href="/admin/contests">
        //                             All Contests
        //                         </a>
        //                     </div>
        //                 </div>
        //             )
        //         }

        //         <div className="admin-header blogs-spot">
        //             Blogs Spot
        //         </div>

        //         {
        //             open[5] && (
        //                 <div className="admin-header adds-on">
        //                     <div className="add-contest">
        //                         <a href="/admin/blogs">
        //                             All blogs
        //                         </a>
        //                     </div>
        //                 </div>
        //             )
        //         }

        //     </div >
        //     <div className="admin-body">

        //     </div>
        // </>
    )
}