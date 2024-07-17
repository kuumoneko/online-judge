import React, { useEffect, useRef, useState } from "react";
import { Blog, color, color_themes, getdata, geturl, User } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
import { sanitize } from "dompurify";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Cookies from "js-cookie";
import { Add_blog } from "./add.js";

function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}


export function Blog() {

    const url = geturl();

    // console.log(url)

    // const user = JSON.parse(localStorage.getItem("user") as string)
    const username = localStorage.getItem("username") as string
    const [html, sethtml] = useState(<></>)
    useEffect(() => {
        async function blogs() {
            const blogs = await getdata("sort", "blogs", { mode: "publish_time", search: url[1], reverser: true, page: 1, lineperpage: 100000 }) || []

            sethtml(
                <div>
                    {
                        (blogs.data.data.length > 0) ?
                            blogs.data.data.map((item: Blog) => {
                                // console.log(item)
                                if (new Date(item.publishTime).getTime() < new Date().getTime())
                                    return (
                                        <div className="blogs">
                                            <h2 className="font-bold" style={{ marginBottom: "10px", color: color_themes }}>
                                                <a href={`/blogs/${item.id}`}>
                                                    {item.name}
                                                </a>
                                            </h2>

                                            <a style={{ marginBottom: "15px", marginRight: "10px" }}>
                                                {`${item.host} published on ${item.publishTime.replace("T", " ")}`}

                                            </a>
                                            <a href={`/blogs/${item.id}/edit`}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </a>



                                            <br style={{ width: "100px" }} />
                                            <Markdown
                                                children={sanitizeHtml(item.body)}
                                                rehypePlugins={[rehypeRaw, rehypeSanitize]} />

                                        </div>
                                    )
                            })
                            : ""
                    }
                </div>
            )
            // const html = (

            // )

            // root.render(html)
        }
        if (url[4] != "add")
            blogs();
    }, [])

    useEffect(() => {
        console.log(html)

    }, [html])

    // console.log(url[2], ' ', username)
    return (
        <div style={{ width: "100%" }}>


            {
                (url[3] == undefined && url[1] == username) && (
                    <>
                        <br />
                        <div style={{
                            height: "100px",
                            width: "1500px",
                        }}>
                            <span>
                                <a
                                    id="add_blogs"
                                    href={`/user/${username}/blogs/add`}
                                    style={{
                                        float: "right"
                                    }}
                                >
                                    Create a blog
                                </a>
                            </span>

                        </div>
                        <br />


                    </>

                )
            }




            {
                (url[4] === "add") && (
                    <Add_blog />
                )
            }

            <div id="blogs">
                {html}
            </div>



        </div>
    )
}