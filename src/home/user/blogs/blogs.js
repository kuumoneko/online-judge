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
import { color_themes, getdata, geturl } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Add_blog } from "./add.js";
function sanitizeHtml(html) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.parentNode.removeChild(script));
    return doc.body.innerHTML;
}
export function Blog() {
    const url = geturl();
    // console.log(url)
    // const user = JSON.parse(localStorage.getItem("user") as string)
    const username = localStorage.getItem("username");
    const [html, sethtml] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        function blogs() {
            return __awaiter(this, void 0, void 0, function* () {
                const blogs = (yield getdata("sort", "blogs", { mode: "publish_time", search: url[1], reverser: true, page: 1, lineperpage: 100000 })) || [];
                sethtml(React.createElement("div", null, (blogs.data.data.length > 0) ?
                    blogs.data.data.map((item) => {
                        // console.log(item)
                        if (new Date(item.publishTime).getTime() < new Date().getTime())
                            return (React.createElement("div", { className: "blogs" },
                                React.createElement("h2", { className: "font-bold", style: { marginBottom: "10px", color: color_themes } },
                                    React.createElement("a", { href: `/blogs/${item.id}` }, item.name)),
                                React.createElement("a", { style: { marginBottom: "15px", marginRight: "10px" } }, `${item.host} published on ${item.publishTime.replace("T", " ")}`),
                                React.createElement("a", { href: `/blogs/${item.id}/edit` },
                                    React.createElement(FontAwesomeIcon, { icon: faPenToSquare })),
                                React.createElement("br", { style: { width: "100px" } }),
                                React.createElement(Markdown, { children: sanitizeHtml(item.body), rehypePlugins: [rehypeRaw, rehypeSanitize] })));
                    })
                    : ""));
                // const html = (
                // )
                // root.render(html)
            });
        }
        if (url[4] != "add")
            blogs();
    }, []);
    useEffect(() => {
        console.log(html);
    }, [html]);
    // console.log(url[2], ' ', username)
    return (React.createElement("div", { style: { width: "100%" } },
        (url[3] == undefined && url[1] == username) && (React.createElement(React.Fragment, null,
            React.createElement("br", null),
            React.createElement("div", {
                style: {
                    height: "100px",
                    width: "1500px",
                }
            },
                React.createElement("span", null,
                    React.createElement("a", {
                        id: "add_blogs", href: `/user/${username}/blogs/add`, style: {
                            float: "right"
                        }
                    }, "Create a blog"))),
            React.createElement("br", null))),
        (url[4] === "add") && (React.createElement(Add_blog, null)),
        React.createElement("div", { id: "blogs" }, html)));
}
//# sourceMappingURL=blogs.js.map