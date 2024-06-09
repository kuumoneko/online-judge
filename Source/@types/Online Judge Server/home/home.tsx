import React, { useEffect, useState } from "react";
import { getdata, color_themes, get_rank_color, User } from "online-judge-types";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
// import { User } from "../../@classes/type.js";

function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}




export function HomePage() {

    const [html, sethtml] = useState(<></>)
    const [top_users, settop] = useState(<></>)


    useEffect(() => {
        async function blogs() {
            const blogs = await getdata("sort", "blogs", { mode: "publish_time", search: "", reverser: true, page: 1, lineperpage: 100000 })
            const users = await getdata("sort", "users", { mode: "points", search: { mode: "all", find: "" }, reverse: true, page: 1, lineperpage: 10 });
            console.log(users)
            sethtml(
                <div>
                    {
                        blogs.data.data.map((item, _index) => {
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

            settop(
                <tbody>
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
                        users.data.data.map((user: User, index: number) => {
                            return (
                                <tr>
                                    <th id="top_users" style={{ width: "15%" }}>
                                        {index + 1}
                                    </th>
                                    <th id="top_users" style={{ width: "70%" }}>
                                        <a href={`/user/${user.username}`} style={{
                                            color: get_rank_color(user.points, user.role, color_themes)
                                        }}>
                                            {user.username}
                                        </a>

                                    </th>
                                    <th id="top_users" style={{ width: "15%" }}>
                                        {user.points}
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            )
        }
        blogs();
    }, [])



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
                        {html}
                    </div>

                </div>
            </div>

            <div style={{ float: 'right', width: "20%" }}>
                <h1>
                    Top Users
                </h1>
                <div id="topusers">
                    <table style={{
                        width: "100%",
                        border: "1px solid white"
                    }}>
                        {top_users}
                    </table>
                </div>
            </div>


        </div>
    )
}