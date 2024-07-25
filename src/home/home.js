import React, { useEffect, useState } from "react";
import { getdata } from "ultility/ulti.js";
import { color_themes, get_rank_color } from "ultility/color.js";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
// import { User } from "../../@classes/type.js";
function sanitizeHtml(html) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.parentNode.removeChild(script));
    return doc.body.innerHTML;
}
export function HomePage() {
    const [html, sethtml] = useState(React.createElement(React.Fragment, null));
    const [top_users, settop] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        async function blogs() {
            const blogs = await getdata("sort", "blogs", { mode: "publish_time", search: "", reverser: true, page: 1, lineperpage: 100000 });
            const users = await getdata("sort", "users", { mode: "points", search: "", reverse: true, page: 1, lineperpage: 10 });
            // console.log(users)
            sethtml(React.createElement("div", null, blogs.data.data.map((item, _index) => {
                // console.log(item)
                if (new Date(item.publishTime).getTime() < new Date().getTime())
                    return (React.createElement("div", { className: "blogs" },
                        React.createElement("h2", { className: "font-bold", style: { marginBottom: "10px", color: color_themes } },
                            React.createElement("a", { href: `/blogs/${item.id}` }, item.name)),
                        React.createElement("a", { style: { marginBottom: "15px", marginRight: "10px" } }, `${item.host} published on ${item.publishTime.replace("T", " ")}`),
                        React.createElement("a", { href: `/blogs/${item.id}/edit` }),
                        React.createElement("br", { style: { width: "100px" } }),
                        React.createElement(Markdown, { children: sanitizeHtml(item.body), rehypePlugins: [rehypeRaw, rehypeSanitize] })));
            })));
            settop(React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("th", { id: "top_users" }, "#"),
                    React.createElement("th", { id: "top_users" }, "Name"),
                    React.createElement("th", { id: "top_users" }, "Points")),
                users.data.data.map((user, index) => {
                    return (React.createElement("tr", null,
                        React.createElement("th", { id: "top_users", style: { width: "15%" } }, index + 1),
                        React.createElement("th", { id: "top_users", style: { width: "70%" } },
                            React.createElement("a", { href: `/user/${user.username}`, style: {
                                    color: get_rank_color(user.points, user.role, color_themes)
                                } }, user.username)),
                        React.createElement("th", { id: "top_users", style: { width: "15%" } }, user.points)));
                })));
        }
        blogs();
    }, []);
    return (React.createElement("div", { style: {
            width: "100%"
        } },
        React.createElement("div", { style: { float: 'left', width: "75%" } },
            React.createElement("h1", { style: { marginBottom: "5px" } }, "Home Page"),
            React.createElement("div", null,
                React.createElement("h1", null, "Blogs"),
                React.createElement("div", { id: "blogs" }, html))),
        React.createElement("div", { style: { float: 'right', width: "20%" } },
            React.createElement("h1", null, "Top Users"),
            React.createElement("div", { id: "topusers" },
                React.createElement("table", { style: {
                        width: "100%",
                        border: "1px solid white"
                    } }, top_users)))));
}
//# sourceMappingURL=home.js.map