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
import { getdata, sort_blogs, color_themes } from "./ulti.js";
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
export function HomePage() {
    useEffect(() => {
        function blogs() {
            return __awaiter(this, void 0, void 0, function* () {
                const blogs = yield getdata("get", "blogs", "all");
                const root = createRoot(document.getElementById("blogs"));
                const html = (React.createElement("div", null, sort_blogs(blogs).map((item, index) => {
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
    return (React.createElement("div", { style: {
            width: "100%"
        } },
        React.createElement("h1", { style: { marginBottom: "5px" } }, "Home Page"),
        React.createElement("div", { style: { float: 'left', width: "80%" } },
            React.createElement("h1", null, "Blogs"),
            React.createElement("div", { id: "blogs" })),
        React.createElement("div", { style: { float: 'right', width: "20%" } },
            React.createElement("table", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "#"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Age"))))));
}
//# sourceMappingURL=home.js.map