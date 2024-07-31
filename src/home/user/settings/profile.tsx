import React, { useEffect, useState } from "react"
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { User, } from "type";
import { get_rank_color } from "color";
import { getdata, getGravatarURL, geturl } from "ulti";
import { User_role } from "enum";


function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}

export function Profile() {
    // console.log(user)

    const [pointsRank, setPR] = useState(0);
    const [rankRank, setRR] = useState(0);

    const [user, setuser]: [User | undefined, Function] = useState()




    useEffect(() => {
        async function lmao() {
            const rank_by_points = await getdata("sort", "users", { mode: "points", search: geturl()[1], reverse: true, page: 1, lineperpage: 100 })
            const rank_by_rank = await getdata("sort", "users", { mode: "rank", search: geturl()[1], reverse: true, page: 1, lineperpage: 100 })

            // console.log(rank_by_points.data.data[0])
            setRR(rank_by_rank.data.data[0].stt)
            setPR(rank_by_points.data.data[0].stt)


            const data = await getdata("get", "users", geturl()[1])
            // console.log(data.data.data[0])
            setuser(data.data.data[0])

        }

        lmao()
    }, [])

    const [html, sethtml] = useState(<></>)

    const color = get_rank_color(Number(localStorage.getItem("rank")), User_role.user, "#ff9797")

    useEffect(() => {
        if (!user) {
            return;
        }
        sethtml(
            <>
                <div style={{ width: "100%" }}>
                    <div style={{ float: "left", height: "400px", minWidth: "15%", border: "1px 1px 1px 1px" }}>
                        <div >
                            <img src={getGravatarURL((user as User).email, 200)} style={{ borderRadius: "100px" }} />

                            <br />
                            <h4 style={{ borderBottom: "0px" }}>
                                <a className="font-bold"> Email: </a>
                                <a style={{ fontSize: "20px" }}>
                                    {(user as User).email}
                                </a>
                            </h4>

                            <h4 style={{ borderBottom: "0px" }}>
                                <a className="font-bold">
                                    {"Points: "}
                                </a>
                                <a style={{ fontSize: "20px" }}>
                                    {(user as User).points}
                                </a>
                            </h4>

                            <h4 style={{ borderBottom: "0px" }}>
                                <a className="font-bold">
                                    {"Rank by points: "}
                                </a>
                                <a style={{ fontSize: "20px" }}>
                                    {`#${pointsRank}`}
                                </a>
                            </h4>

                            <h4 style={{ borderBottom: "0px" }}>
                                <a className="font-bold">
                                    {"Problems solved: "}
                                </a>
                                <a style={{ fontSize: "20px" }}>
                                    {(user as User).problems_count}
                                </a>
                            </h4>


                            <a style={{ display: "block", borderBottom: "1px solid #d2d2d2", minWidth: "30%" }} />

                            <h4 style={{ borderBottom: "0px" }}>
                                <a className="font-bold">
                                    {"Rank by rating: "}
                                </a>
                                <a style={{ fontSize: "20px" }}>
                                    {`#${rankRank}`}
                                </a>
                            </h4>

                            <h4 style={{ borderBottom: "0px" }}>
                                <a className="font-bold">
                                    {"Rating: "}
                                </a>
                                <a className="font-bold" style={{ fontSize: "20px", color: color }}>
                                    {(user as User).rank}
                                </a>
                            </h4>

                        </div>
                    </div>
                    <div style={{ height: "400px", minWidth: "60%" }}>
                        {
                            ((user as User).group.length != 0) ? (
                                <>
                                    <div>
                                        <h1 className="font-bold">
                                            FROM:
                                        </h1>
                                    </div>
                                    <br />
                                    <div >
                                        <a>
                                            {/* {"From: "} */}
                                            {(user as User).group.map((i: any, index: number) => {
                                                // console.log(i);
                                                if (index == (user as User).group.length - 1) {
                                                    return (
                                                        <a href={`/group/${i}`}>
                                                            {` ${i}`}
                                                        </a>
                                                    )
                                                }
                                                return (
                                                    <a href={`/group/${i}`}>
                                                        {` ${i},`}
                                                    </a>
                                                );
                                            }
                                            )}
                                        </a>
                                    </div>
                                    <br />
                                </>
                            ) : (<></>)
                        }
                        {
                            (
                                (user as User).profile
                            ) ?
                                (
                                    <>
                                        <div>
                                            <h1 className="font-bold">
                                                ABOUT ME:
                                            </h1>
                                        </div>
                                        <div>
                                            <Markdown
                                                children={sanitizeHtml((user as User).profile)}
                                                rehypePlugins={[rehypeRaw, rehypeSanitize]} />
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                    </>
                                )
                        }

                    </div>
                </div>

            </>
        )
    }, [user])


    return (
        html
    )
}
