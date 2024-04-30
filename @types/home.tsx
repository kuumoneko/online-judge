import React, { useEffect } from "react";
import { getdata, sort_blogs, color, color_themes } from "./ulti.js";
import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}




export function HomePage() {


    useEffect(() => {
        async function blogs() {
            const blogs = await getdata("get", "blogs", "all")
            // console.log(blogs)



            // const blogs = user.blogs;
            const root = createRoot(document.getElementById("blogs") as HTMLElement);
            // console.log(url[3] == "add")
            const html = (
                <div>
                    {
                        sort_blogs(blogs).map((item, index) => {
                            // console.log(item)
                            if (new Date(item.publish_time).getTime() < new Date().getTime())
                                return (
                                    <div className="blogs">
                                        <h2 className="font-bold" style={{ marginBottom: "10px", color: color_themes }}>
                                            <a href={`/blogs/${item.id}`}>
                                                {item.title}
                                            </a>
                                        </h2>

                                        <a style={{ marginBottom: "15px", marginRight: "10px" }}>
                                            {`${item.host} published on ${item.publish_time.replace("T", " ")}`}

                                        </a>
                                        <a href={`/blogs/${item.id}/edit`}>
                                            {/* <FontAwesomeIcon icon={} /> */}
                                        </a>



                                        <br style={{ width: "100px" }} />
                                        <Markdown
                                            children={sanitizeHtml(item.html)}
                                            rehypePlugins={[rehypeRaw, rehypeSanitize]} />

                                    </div>
                                )
                        })
                    }
                </div>
            )

            root.render(html)
        }
        // if (url[3] != "add")
        blogs();
    })

    return (
        <div style={{
            width: "100%"
        }}>
            <h1 style={{ marginBottom: "5px" }}>
                Home Page
            </h1>
            <div style={{ float: 'left', width: "80%" }}>
                <h1>
                    Blogs
                </h1>
                <div id="blogs">

                </div>

            </div>

            <div style={{ float: 'right', width: "20%" }}>
                <table>

                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Age
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    )
}