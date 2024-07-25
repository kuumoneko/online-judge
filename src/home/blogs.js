import React, { useEffect, useState } from "react";
import { getdata } from "ultility/ulti.js";
import { color_themes } from "ultility/color.js";
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
        async function blogs() {
            const blogs = await getdata("get", "blogs", url[2]);
            const htmll = (React.createElement("div", { className: "blogs", style: { width: "100%", minHeight: "25vh" } },
                React.createElement("h2", { className: "font-bold", style: { marginBottom: "10px", color: color_themes } },
                    React.createElement("a", { href: `/blogs/${blogs.data.id}` }, blogs.data.title)),
                React.createElement("a", { style: { marginBottom: "15px", marginRight: "10px" } }, `${blogs.data.host} published on ${blogs.data.publish_time.replace("T", " ")}`),
                (JSON.parse(localStorage.getItem("user")).username == blogs.data.id.split("_")[0]) && (React.createElement("a", { href: `/blogs/${blogs.data.id}/edit` },
                    React.createElement(FontAwesomeIcon, { icon: faPenToSquare }))),
                React.createElement("br", { style: { width: "100px" } }),
                React.createElement(Markdown, { children: sanitizeHtml(blogs.data.html), rehypePlugins: [rehypeRaw, rehypeSanitize] })));
            sethtml(htmll);
        }
        if (url[3] != "add")
            blogs();
    });
    return (React.createElement("div", { id: "blogs", style: { width: "100%" } }, html));
}
//# sourceMappingURL=blogs.js.map