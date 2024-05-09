import React, { useEffect } from "react";
import { getdata, sort_blogs, color_themes, SortUser, get_rank_color } from "../@classes/ultility.js";
import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { User } from "../@classes/type.js";

function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}




export function HomePage({ users }: { users: User[] }) {


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
                        sort_blogs(blogs).map((item, _index) => {
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

    const temp = SortUser(users, "points", true);

    return (
        <div style={{
            width: "100%"
        }}>
            <div style={{ float: 'left', width: "75%" }}>
                <h1 style={{ marginBottom: "5px" }}>
                    Home Page
                </h1>
                <div >
                    <h1>
                        Blogs
                    </h1>
                    <div id="blogs" >

                    </div>

                </div>
            </div>

            <div style={{ float: 'right', width: "20%" }}>
                <h1>
                    Top Users
                </h1>
                <div>
                    <table style={{
                        width: "100%",
                        border: "1px solid white"
                    }}>

                        <tr>
                            <th id="top_users">
                                #
                            </th>
                            <th id="top_users">
                                Name
                            </th>
                            <th id="top_users">
                                Points
                            </th>
                        </tr>

                        {
                            temp.slice(0, 10).map((item, index) => {
                                return (
                                    <tr>
                                        <th id="top_users">
                                            {index + 1}
                                        </th>
                                        <th id="top_users" >
                                            <a href={`/user/${item.user.username}`} style={{
                                                color: get_rank_color(item.user.points, item.user.role, color_themes)
                                            }}>
                                                {item.user.username}
                                            </a>

                                        </th>
                                        <th id="top_users">
                                            {item.user.points}
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>


        </div>
    )
}