
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css"
import { Navigator } from "./navigator/index.tsx";
import Cookies from 'js-cookie';
import { getdata, geturl } from "ulti";
import { color } from "color";
import { Home } from "./home/index.tsx";
import { Admin } from './admin/index.tsx';
import { Title } from './title.tsx';
import { Test, Testt } from './test/index.tsx';
import { auth_user } from './pre_run/auth.tsx';

const root_element = document.getElementById("root");

const root = createRoot(root_element as HTMLElement);

function Server() {

    const [url, seturl] = useState(geturl());
    const [themes, setthemes] = useState();


    useEffect(() => {
        async function pre_run() {
            const res = await auth_user();
            // console.log(res.data.username)
            if (res.data.username == undefined) {
                // console.log(Cookies.get("theme") == "undefined")

                Cookies.set("theme", (Cookies.get("theme") == undefined) ? "light" : Cookies.get("theme") as "dark" | "light", {
                    expires: 365
                })

                setthemes(
                    color[Cookies.get("theme") as "dark" | "light"]
                )

                localStorage.removeItem("username")
                localStorage.removeItem("email")
                localStorage.removeItem("role")
                localStorage.removeItem("rank")
            }
            else {

                const user = await getdata("get", "users", res.data.username);
                // console.log(user.data.data[0].verified)

                if (user.data.data[0].verified == false && url[0] != "verify") {
                    window.location.href = `/verify/${user.data.data[0].username}`
                }

                Cookies.set("theme", user.data.data[0].themes.mode, {
                    expires: 365
                })
                // setuser(undefined)
                setthemes(
                    color[Cookies.get("theme") as "dark" | "light"]
                )

                localStorage.setItem("username", res.data.username)

                localStorage.setItem("email", user.data.data[0].email)
                localStorage.setItem("role", user.data.data[0].role)
                localStorage.setItem("rank", user.data.data[0].rank)
            }
        }



        pre_run();
    }, [])


    const [html, sethtml] = useState(<></>)
    useEffect(() => {
        // console.log(themes)
        if (themes == undefined) {
            return;
        }

        const body = document.getElementById("root");
        if (body) {
            // body.style.height = "200vh"
            body.style.backgroundColor = (themes as any).content;
            body.style.color = (themes as any).font;
        }
        sethtml(
            <>

                <Navigator />

                <div
                    style={{
                        paddingLeft: "25px",
                        paddingRight: "25px"
                    }}
                >
                    <Title url={url} themes={themes} />

                    <div className="content-body" style={{ paddingBottom: "4em", display: "flex", justifyContent: "space-around" }}>
                        {
                            (url[0] == "admin") ? (
                                <Admin />
                            ) : (
                                <Home />
                            )
                        }
                    </div>
                </div>


                <footer style={{
                    display: "flex", justifyContent: "space-around", flexDirection: "column",
                    backgroundColor: "white", color: "black"
                }}>
                    <span style={{ color: "black" }}>
                        {"proudly powered by "}
                        <a target="_blank" rel="noopener noreferrer" href="https://react.dev">
                            {" React.js "}
                        </a>
                        {" | "}
                        <a href="/user/kuumoneko" target="_blank" rel="noopener noreferrer">
                            kuumoneko
                        </a>
                    </span>
                </footer>
            </>
        )
    }, [themes])

    return (
        html
    )
}

enum ServerMode {
    production = "production",
    development = "development",
    test = "test",
}

const mode = ServerMode.test;

try {
    if (mode == ServerMode.production || mode == ServerMode.development) {
        root.render(
            <Server />
        )
    }
    else if (mode == ServerMode.test) {
        root.render(
            <Testt />
        )
    }
}
catch (e) {
    console.log(e)
}
