// @ts-nocheck
import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import "./index.css";

import Navigator from "./navigator.js";
import { Already, Singupform } from "./signup.js";
import { Loginform } from "./login.js";
import Cookies from 'js-cookie';
import { getGroup, insertGroup, insertUser, replaceAll } from './ulti.js';
import { Users } from './users.js';
import { About } from './about.js';
import { Admin } from './admin.js';



const root = createRoot(document.getElementById("root"));


if (!document.referrer && Cookies.get("remember") == "false") {
    Cookies.remove("user")
    Cookies.remove("remember")
}

const url = document.URL;
const temp = document.cookie.split(";");
let cookies = {};

temp.forEach((cookie) => {
    const lmao = cookie.split("=");
    if (lmao[0] != "") {
        while (lmao[0][0] == " ") {
            lmao[0] = lmao[0].slice(1)
        }
        while (lmao[0][lmao[0].length - 1] == " ") {
            lmao[0] = lmao[0].slice(0, lmao[0].length - 2)
        }

        while (lmao[1][0] == " ") {
            lmao[1] = lmao[1].slice(1)
        }
        while (lmao[1][lmao[1].length - 1] == " ") {
            lmao[1] = lmao[1].slice(0, lmao[1].length - 2)
        }
        cookies[lmao[0]] = lmao[1]
    }
})

function Checking({ url }) {
    // console.log(url.split("/"))
    const direct = url.split("/")[3].split("#")[0];

    if (cookies.user && (direct == "login" || direct == "signup")) {
        return (
            <Already />
        )
    }
    if (direct == "login") {
        return (
            <Loginform />
        )
    }
    else if (direct == "signup") {
        return (
            <Singupform />
        )
    }
    else if (direct == "users" || direct == "contributors" || direct == "groups") {
        return (
            <Users mode={direct} />
        )
    }
    else if (direct == "user") {
        return (
            <div>

            </div>
        )
    }
    else if (direct == "about") {
        return (
            <About />
        )
    }
    else if (direct == "admin") {
        return (
            <Admin>
                
            </Admin>
        )
    }
}

function Userss({ mode }) {

    function res(modee) {
        return {
            borderRadius: "4px 4px 0 0",
            borderTop: (modee == mode) ? "3px solid #ff99cc" : "",
            borderBottom: (modee == mode) ? "1px solid #ffffff" : "1px solid #dddddd",
            borderLeft: (modee == mode) ? "1px solid #dddddd" : "1px solid #ffffff",
            borderRight: (modee == mode) ? "1px solid #dddddd" : "1px solid #ffffff",
        }
    }

    return (
        <ul style={{ display: "flex", margin: "0", height: "45px", float: "right", marginBottom: "-1px", flexWrap: "nowrap", alignItems: "flex-end" }}>
            <li>
                <a id="users" href='/users' style={res("users")}>
                    User
                </a>
            </li>
            <li>
                <a id="users" href='/groups' style={res("groups")}>
                    Groups
                </a>
            </li>
        </ul>
    )
}

function Create_title({ url }) {
    var temp = url.split("/")[url.split("/").length - 1].split("#")[0].toLowerCase()

    temp = replaceAll(temp, "_", " ");


    return (
        <>
            <br style={{ paddingBottom: "10px" }}>
            </br>
            <div
                className='tabs'
                style={{
                    borderBottom: "1px  solid #3b3b3b3b",
                    display: "flex",
                    margin: "0 0 8px",
                    width: "100%",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    height: "45px"
                }}>
                {/* <br /> */}
                <h2 style={{ maxWidth: "10em", fontSize: "2em" }}>
                    {
                        (temp == "admin") ? "Site administration" :
                            temp.toUpperCase()
                    }
                </h2>
                {(temp == "users" || temp == "groups") ? (
                    <Userss mode={temp} />
                ) : (<></>)}
            </div>
        </>
    )
}

// console.log(url.split("/")[3])

root.render(
    <StrictMode>
        {/* <MyComponent /> */}
        <Navigator mode={(url.split("/")[3] == "admin") ? "admin" : "normal"} loggedin={(cookies.user) ? true : false} username={cookies.user} />
        <div id='page-container'>
            <noscript>
                <div id="noscript">This site works best with JavaScript enabled.</div>
            </noscript>
            <br></br>
            <main id='content'>
                <Create_title url={url} />

                <div className="content-body" style={{ paddingBottom: "4em", display: "flex" }}>
                    <Checking url={url} />
                </div>

            </main>

            <footer style={{
                display: "flex", justifyContent: "space-around", flexDirection: "column"
            }}>
                <span style={{ color: "white" }}>
                    {"proudly powered by "}
                    <a href="https://dmoj.ca">
                        DMOJ
                    </a>

                    {" & "}

                    <a href="https://oj.vnoi.info/">
                        VNOJ
                    </a>
                    {" using React.js | "}
                    <a href="/user/nekoteam">
                        nekoteam
                    </a>
                </span>
            </footer>

            {/* <div style={{float:"bo"}}>
                <a>
                    lmao
                </a>
            </div> */}



        </div >

    </StrictMode >
);

// function generateRandomFourDigitNumber(min, max) {
//     // Generate a random number between 1000 (inclusive) and 9999 (exclusive)
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }


// const gr = ['IMB7MNYChk', 'jVcNGNsEET', 'UDi5aHnMPH', 'pd0cF9d56D', 'q5YbShesaj', 'hA7dEpWHCG', 'CBIjD45UUS', 'gOUyLO64BA', 'BGSKmH6JwB', 'zoCNPihCdl']

// gr.random = () => {
//     const n = gr.length;
//     return gr[Math.floor(Math.random() * (n))]
// }


// function random_group() {
//     const temp = Math.floor(Math.random() * (5) + 1);
//     const list = gr.slice(0, temp - 1)
//     return list
// }

// setInterval(() => {
//     const indexedDB = window.indexedDB;


//     const test = indexedDB.open("users", 1)

//     test.onupgradeneeded = (event) => {
//         const db = event.target.result
//         db.createObjectStore("user")
//     }

//     test.onsuccess = (event) => {
//         const db = event.target.result;

//         const txn = db.transaction('user', 'readonly');

//         // get the Contacts object store
//         const store = txn.objectStore('user');

//         const user = store.getAll();

//         // const temp
//         user.onsuccess = (e) => {
//             const users = e.target.result;

//             const test = indexedDB.open("groups", 1)

//             test.onupgradeneeded = (event) => {
//                 const db = event.target.result
//                 db.createObjectStore("group")
//             }

//             test.onsuccess = (event) => {
//                 const dbi = event.target.result;

//                 const lmao = getGroup(users)
//                 // console.log(lmao)

//                 lmao.forEach((item) => {
//                     insertGroup(dbi, item)
//                 })

//             }

//             // users.forEach((user) => {
//             //     insertUser(db, {
//             //         fullname: user.fullname,
//             //         username: user.username,
//             //         password: user.password,
//             //         points: user.points,
//             //         problems_count: user.problems_count,
//             //         group: user.group,
//             //         rank: user.rank,
//             //         email: "kuumoneko@gmail.com",
//             //         // user, admin, administrator
//             //         role: user.role,
//             //         contribute: user.contribute
//             //     })
//             // })
//         }
//     }

// }, 5000)
