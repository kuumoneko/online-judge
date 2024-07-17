import React, { useEffect, useState } from "react";
import { color_themes, getdata } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
// import { sanitize } from "dompurify";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
// import Cookies from "js-cookie";


function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}


export function Blog({ url }: { url: string[] }) {
    // console.log(url[3])
    // const user = JSON.parse(localStorage.getItem("user") as string)
    // console.log(url[1] , ' ' , user.username)

    const [html, sethtml] = useState(<></>);

    useEffect(() => {
        async function blogs() {
            const blogs = await getdata("get", "blogs", url[2])

            const htmll = (
                <div className="blogs" style={{ width: "100%", minHeight: "25vh" }}>
                    <h2 className="font-bold" style={{ marginBottom: "10px", color: color_themes }}>
                        <a href={`/blogs/${blogs.data.id}`}>
                            {blogs.data.title}
                        </a>
                    </h2>

                    <a style={{ marginBottom: "15px", marginRight: "10px" }}>
                        {`${blogs.data.host} published on ${blogs.data.publish_time.replace("T", " ")}`}

                    </a>
                    {
                        (JSON.parse(localStorage.getItem("user") as string).username == blogs.data.id.split("_")[0]) && (
                            <a href={`/blogs/${blogs.data.id}/edit`}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </a>
                        )
                    }

                    <br style={{ width: "100px" }} />
                    <Markdown
                        children={sanitizeHtml(blogs.data.html)}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]} />

                </div>
            )

            sethtml(htmll)

        }
        if (url[3] != "add")
            blogs();
    })
    return (
        <div id="blogs" style={{ width: "100%" }}>
            {html}
        </div>
    )
}