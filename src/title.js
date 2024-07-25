import React from "react";
import { replaceAll } from "ultility/ulti.js";
function Userss({ mode, themes }) {
    function resss(modee) {
        return {
            borderRadius: "4px 4px 0 0",
            borderTop: (modee == mode) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
            borderBottom: (modee == mode) ? `1px solid ${themes.content}` : `1px solid ${themes.font}`,
            borderLeft: (modee == mode) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
            borderRight: (modee == mode) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
        };
    }
    return (React.createElement("ul", { style: { paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" } },
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: '/users', style: resss("users") }, "User")),
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: '/groups', style: resss("groups") }, "Groups"))));
}
function Userr({ mode, themes, user }) {
    function resss(modee) {
        // console.log(modee, ' ', mode)
        return {
            borderRadius: "4px 4px 0 0",
            borderTop: (modee == mode[2]) ? "3px solid #ff99cc" : `1px solid ${themes.content}`,
            borderBottom: (modee == mode[2]) ? `1px solid ${themes.content}` : `1px solid ${themes.font}`,
            borderLeft: (modee == mode[2]) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
            borderRight: (modee == mode[2]) ? `1px solid ${themes.font}` : `1px solid ${themes.content}`,
        };
    }
    return (React.createElement("ul", { style: { paddingLeft: "0px", backgroundColor: `${themes.content}`, color: `${themes.font}`, borderBottom: "0px", display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" } },
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: `/user/${mode[1]}`, style: resss(undefined) }, "About")),
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: `/user/${mode[1]}/statistics`, style: resss("statistics") }, "Statistics")),
        React.createElement("li", null,
            React.createElement("a", { id: "users", href: `/user/${mode[1]}/blogs`, style: resss("blogs") }, "Blogs")),
        (user == mode[1]) &&
            (React.createElement("li", null,
                React.createElement("a", { id: "users", href: `/user/${mode[1]}/edit_profile`, style: resss("edit_profile") }, "Edit profile")))));
}
export function Title({ url, themes }) {
    let temp = url[0];
    // console.log(url)
    // const [username, setusername] = useState("")
    temp = replaceAll(temp, "_", " ");
    // useEffect(() => {
    //     async function lmao() {
    //         await getdata("get", "users", username).then((user) => {
    //             const titllee = document.getElementById("titlee")
    //             if (titllee) {
    //                 titllee.style.color = get_rank_color(user.rank, User_role.user, themes.content)
    //                 console.log(titllee)
    //             }
    //         })
    //     }
    // }, [username])
    // useEffect(() => {
    //     async function lmaoo() {
    //         const session = await getdata("auth", "users", Cookies.get("sessionId"))
    //         setusername(session ? session.data.username : "")
    //     }
    //     if (temp == "user") {
    //         lmaoo();
    //     }
    // }, [])
    return (React.createElement(React.Fragment, null,
        React.createElement("br", { style: { paddingBottom: "10px" } }),
        React.createElement("div", { className: 'tabs', style: {
                borderBottom: `1px  solid ${themes.font}`,
                display: "flex",
                margin: "0 0 8px",
                width: "100%",
                justifyContent: "space-between",
                flexWrap: "wrap",
                height: "45px"
            } },
            React.createElement("h2", { id: "title", style: { fontSize: "2em" } }, (temp == "admin")
                ?
                    `Adminisrator ${url[2] ? `for ${url[2]}` : "Dashboard"}`
                :
                    (temp == "user") ?
                        (React.createElement("a", { id: "titlee", className: 'font-bold' }, url[1])) : temp.toUpperCase()),
            (temp == "users" || temp == "groups") ? (React.createElement(Userss, { mode: temp, themes: themes })) : (temp == "user") ? (React.createElement(Userr, { mode: url, themes: themes, user: localStorage.getItem("username") })) : (React.createElement(React.Fragment, null)))));
}
//# sourceMappingURL=title.js.map