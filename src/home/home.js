var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect } from "react";
import { getdata, sort_blogs, color_themes, SortUser, get_rank_color } from "../@classes/ultility.js";
import { createRoot } from "react-dom/client";
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
export function HomePage({ users }) {
    useEffect(() => {
        function blogs() {
            return __awaiter(this, void 0, void 0, function* () {
                const blogs = yield getdata("get", "blogs", "all");
                const root = createRoot(document.getElementById("blogs"));
                const html = (React.createElement("div", null, sort_blogs(blogs).map((item, _index) => {
                    if (new Date(item.publish_time).getTime() < new Date().getTime())
                        return (React.createElement("div", { className: "blogs" },
                            React.createElement("h2", { className: "font-bold", style: { marginBottom: "10px", color: color_themes } },
                                React.createElement("a", { href: `/blogs/${item.id}` }, item.title)),
                            React.createElement("a", { style: { marginBottom: "15px", marginRight: "10px" } }, `${item.host} published on ${item.publish_time.replace("T", " ")}`),
                            React.createElement("a", { href: `/blogs/${item.id}/edit` }),
                            React.createElement("br", { style: { width: "100px" } }),
                            React.createElement(Markdown, { children: sanitizeHtml(item.html), rehypePlugins: [rehypeRaw, rehypeSanitize] })));
                })));
                root.render(html);
            });
        }
        blogs();
    });
    const temp = SortUser(users, "points", true);
    return (React.createElement("div", { style: {
            width: "100%"
        } },
        React.createElement("div", { style: { float: 'left', width: "75%" } },
            React.createElement("h1", { style: { marginBottom: "5px" } }, "Home Page"),
            React.createElement("div", null,
                React.createElement("h1", null, "Blogs"),
                React.createElement("div", { id: "blogs" }))),
        React.createElement("div", { style: { float: 'right', width: "20%" } },
            React.createElement("h1", null, "Top Users"),
            React.createElement("div", null,
                React.createElement("table", { style: {
                        width: "100%",
                        border: "1px solid white"
                    } },
                    React.createElement("tr", null,
                        React.createElement("th", { id: "top_users" }, "#"),
                        React.createElement("th", { id: "top_users" }, "Name"),
                        React.createElement("th", { id: "top_users" }, "Points")),
                    temp.slice(0, 10).map((item, index) => {
                        return (React.createElement("tr", null,
                            React.createElement("th", { id: "top_users" }, index + 1),
                            React.createElement("th", { id: "top_users" },
                                React.createElement("a", { href: `/user/${item.user.username}`, style: {
                                        color: get_rank_color(item.user.points, item.user.role, color_themes)
                                    } }, item.user.username)),
                            React.createElement("th", { id: "top_users" }, item.user.points)));
                    }))))));
}
//# sourceMappingURL=home.js.map