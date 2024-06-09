import React, { useState } from "react";
export function Admin_dashboard() {
    const [open, setopen] = useState([false, false, false, false, false, false]);
    const onCLick_Header = (e) => {
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
    };
    return (React.createElement("div", { className: "dashboard" },
        React.createElement("div", { className: "dashboard-content" },
            React.createElement("div", { className: "dashboard-header" }, "Problems"),
            React.createElement("div", { className: "adds-on" },
                React.createElement("button", { className: "admin-direct" },
                    React.createElement("a", { href: "/admin/problems" }, "All Problems")),
                React.createElement("button", { className: "admin-direct" },
                    React.createElement("a", { href: "/admin/problems/types" }, "Problems types")),
                React.createElement("button", { className: "admin-direct" },
                    React.createElement("a", { href: "/admin/problems/groups" }, "Problems groups")))),
        React.createElement("div", { className: "dashboard-content" },
            React.createElement("div", { className: "dashboard-header" }, "Submissions"),
            React.createElement("div", { className: "adds-on" },
                React.createElement("button", { className: "admin-direct" },
                    React.createElement("a", { href: "/admin/submissions" }, "All Submissions")))),
        React.createElement("div", { className: "dashboard-content" },
            React.createElement("div", { className: "dashboard-header" }, "Groups"),
            React.createElement("div", { className: "adds-on" },
                React.createElement("button", { className: "admin-direct" },
                    React.createElement("a", { href: "/admin/groups" }, "All Groups")))),
        React.createElement("div", { className: "dashboard-content" },
            React.createElement("div", { className: "dashboard-header" }, "Users"),
            React.createElement("div", { className: "adds-on" },
                React.createElement("button", { className: "admin-direct" },
                    React.createElement("a", { href: "/admin/users" }, "Moderate user")))),
        React.createElement("div", { className: "dashboard-content" },
            React.createElement("div", { className: "dashboard-header" }, "Contests"),
            React.createElement("div", { className: "adds-on" },
                React.createElement("button", { className: "admin-direct" },
                    React.createElement("a", { href: "/admin/contests" }, "All Contest")))),
        React.createElement("div", { className: "dashboard-content" },
            React.createElement("div", { className: "dashboard-header" }, "Blogs Spot"),
            React.createElement("div", { className: "adds-on" },
                React.createElement("button", { className: "admin-direct" },
                    React.createElement("a", { href: "/admin/blogs" }, "All blogs"))))));
}
//# sourceMappingURL=dashboard.js.map