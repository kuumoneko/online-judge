import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
export function Admin_dashboard() {
    const [open, setopen] = useState([false, false, false, false, false, false]);
    const onCLick_Header = (e) => {
        e.preventDefault();
        const target = e.target.className.split(" ")[0];
        console.log(target);
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
    return (React.createElement("div", { className: "dashboard", onClick: onCLick_Header },
        React.createElement("div", null,
            React.createElement("div", { style: {
                    display: 'flex'
                } },
                React.createElement("a", { style: { cursor: "pointer" } }, "Problems"),
                React.createElement("div", { style: {
                        cursor: "pointer",
                        paddingLeft: "150px"
                    }, onClick: (e) => { window.location.href = "/admin/problems/add"; } },
                    React.createElement(FontAwesomeIcon, { icon: faPlus }),
                    React.createElement("a", { style: {
                            paddingLeft: "5px"
                        } }, "Add")),
                React.createElement("div", { style: {
                        cursor: "pointer",
                        paddingLeft: "10px"
                    }, onClick: (e) => { window.location.href = "/admin/problems"; } },
                    React.createElement(FontAwesomeIcon, { icon: faEye }),
                    React.createElement("a", { style: {
                            paddingLeft: "5px"
                        } }, "View"))),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null))));
}
//# sourceMappingURL=dashboard.js.map