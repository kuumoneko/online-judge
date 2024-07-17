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
import { color_themes, getdata } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
// import { sanitize } from "dompurify";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
// import Cookies from "js-cookie";
function sanitizeHtml(html) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.parentNode.removeChild(script));
    return doc.body.innerHTML;
}
export function Blog({ url }) {
    // console.log(url[3])
    // const user = JSON.parse(localStorage.getItem("user") as string)
    // console.log(url[1] , ' ' , user.username)
    const [html, sethtml] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        function blogs() {
            return __awaiter(this, void 0, void 0, function* () {
                const blogs = yield getdata("get", "blogs", url[2]);
                const htmll = (React.createElement("div", { className: "blogs", style: { width: "100%", minHeight: "25vh" } },
                    React.createElement("h2", { className: "font-bold", style: { marginBottom: "10px", color: color_themes } },
                        React.createElement("a", { href: `/blogs/${blogs.data.id}` }, blogs.data.title)),
                    React.createElement("a", { style: { marginBottom: "15px", marginRight: "10px" } }, `${blogs.data.host} published on ${blogs.data.publish_time.replace("T", " ")}`),
                    (JSON.parse(localStorage.getItem("user")).username == blogs.data.id.split("_")[0]) && (React.createElement("a", { href: `/blogs/${blogs.data.id}/edit` },
                        React.createElement(FontAwesomeIcon, { icon: faPenToSquare }))),
                    React.createElement("br", { style: { width: "100px" } }),
                    React.createElement(Markdown, { children: sanitizeHtml(blogs.data.html), rehypePlugins: [rehypeRaw, rehypeSanitize] })));
                sethtml(htmll);
            });
        }
        if (url[3] != "add")
            blogs();
    });
    return (React.createElement("div", { id: "blogs", style: { width: "100%" } }, html));
}
//# sourceMappingURL=blogs.js.map