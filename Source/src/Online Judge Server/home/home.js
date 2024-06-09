var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from "react";
import { getdata, color_themes, get_rank_color } from "online-judge-types";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
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
        function blogs() {
            return __awaiter(this, void 0, void 0, function* () {
                const blogs = yield getdata("sort", "blogs", { mode: "publish_time", search: "", reverser: true, page: 1, lineperpage: 100000 });
                const users = yield getdata("sort", "users", { mode: "points", search: { mode: "all", find: "" }, reverse: true, page: 1, lineperpage: 10 });
                console.log(users);
                sethtml(React.createElement("div", null, blogs.data.data.map((item, _index) => {
                    if (new Date(item.publish_time).getTime() < new Date().getTime())
                        return (React.createElement("div", { className: "blogs" },
                            React.createElement("h2", { className: "font-bold", style: { marginBottom: "10px", color: color_themes } },
                                React.createElement("a", { href: `/blogs/${item.id}` }, item.title)),
                            React.createElement("a", { style: { marginBottom: "15px", marginRight: "10px" } }, `${item.host} published on ${item.publish_time.replace("T", " ")}`),
                            React.createElement("a", { href: `/blogs/${item.id}/edit` }),
                            React.createElement("br", { style: { width: "100px" } }),
                            React.createElement(Markdown, { children: sanitizeHtml(item.html), rehypePlugins: [rehypeRaw, rehypeSanitize] })));
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
            });
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