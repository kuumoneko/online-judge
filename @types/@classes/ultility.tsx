
// import Ansi from "ansi-to-react";

import axios from "axios"
import { sha256 } from "js-sha256"
import React, { ReactElement } from "react";
import { Blogs, Group, User } from "./type.js";
import { User_role } from "./enum.js";
import Cookies from "js-cookie"
// import { User } from "./user";
// import { string } from "yup"



const rank_color = {
    "Newbie": "#808080",
    "Pupil": "#008000",
    "Specialist": "#03a89e",
    "Expert": "#0000ff",
    "Candidate Master": "#aa00aa",
    "Master": "#ff8c00",
    "Grandmaster": "#ff1a1a",
}

/**
 * 
 */
export function get_rank_color(points: number, role: User_role, themes: string = color_themes): string {
    // console.log(role, " ", User_role.administrator)
    if (role == User_role.administrator) {
        return themes;
    }
    else if (points < 1200) {
        return rank_color.Newbie
    }
    else if (points >= 1200 && points <= 1399) {
        return rank_color.Pupil
    }
    else if (points >= 1400 && points <= 1599) {
        return rank_color.Specialist
    }
    else if (points >= 1600 && points <= 1899) {
        return rank_color.Expert
    }
    else if (points >= 1900 && points <= 2199) {
        return rank_color["Candidate Master"]
    }
    else if (points >= 2200 && points <= 2399) {
        return rank_color.Master
    }
    else if (points >= 2400) {
        return rank_color.Grandmaster
    }

    return rank_color.Newbie


}

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}



// function sortt(lists: any[], mode: string, reverse = false) {

//     const prio = ["rank", "points", "problems_count", "username", "fullname", "unt", "group"]

//     lists.sort((a, b) => {

//         if (a[mode] != b[mode]) {
//             return (a[mode] - b[mode]) * (reverse ? -1 : 1)
//         }
//         else {
//             for (let i = 0; i < prio.length; i++) {
//                 const item = prio[i];

//                 if (item != mode) {
//                     if (a[item] != b[item]) {
//                         return (a[item] - b[item]) * (reverse ? -1 : 1)
//                     }
//                 }
//             }
//             return 0;
//         }
//     })


//     return lists;
// }

// /**
//  * 
//  * @param {User[]} users 
//  * @param {string} mode 
//  * @param {boolean} [reverse=false] 
//  * @param {string} search 
//  */
// export function SortUser(users: User[], mode: string, reverse: boolean = false, search: string = "") {
//     // console.log(search)
//     search = search.toLowerCase()
//     // console.log(mode)
//     // users.sort((a, b) => (
//     //     (a[mode] - b[mode]) * ((reverse == false) ? 1 : -1)
//     // )
//     // )

//     users = sortt(users, mode, reverse)


//     // console.log(users)

//     // const themes = JSON.parse(localStorage.getItem("user")).themes.mode;

//     type temping = {
//         stt: number,
//         username: string,
//         user: User
//     }
//     const res: temping[] = []
//     let indexx = 1;
//     users.forEach((item: User, index: number) => {

//         if (search == "") {
//             res.push({
//                 stt: index + 1,
//                 username: (item.username as string),
//                 user: item
//             })
//             // indexx += 1;
//         }
//         else if ((item.fullname as string).toLowerCase().includes(search) || (item.username as string).toLowerCase().includes(search)) {
//             res.push({
//                 stt: index + 1,
//                 username: (item.username as string),
//                 user: item
//             })
//             if ((item.fullname as string).toLowerCase().includes(search)) {

//                 const string = (item.fullname as string).toLowerCase();

//                 const indices: number[] = [];
//                 let currentIndex: number = 0;

//                 while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
//                     indices.push(currentIndex);
//                     currentIndex++;
//                 }

//                 const temp: string[] = []
//                 let i = 0;
//                 indices.forEach((itemm) => {
//                     temp.push((item.fullname as string).slice(i, itemm))
//                     temp.push((item.fullname as string).slice(itemm, itemm + search.length))
//                     i = itemm + search.length
//                 })

//                 temp.push(item.fullname as string);

//                 (item.fullname as ReactElement) = (
//                     <a>
//                         {
//                             temp.map((item) => {
//                                 // console.log(item)
//                                 if (item.toLowerCase() == search) {

//                                     return (
//                                         <a style={{ backgroundColor: "yellow" }}>
//                                             {item}
//                                         </a>
//                                     )
//                                 }
//                                 else {
//                                     return (
//                                         <a>
//                                             {item}
//                                         </a>
//                                     )
//                                 }
//                             })
//                         }
//                     </a>
//                 );
//             }
//             if ((item.username as string).toLowerCase().includes(search)) {


//                 const string = (item.username as string).toLowerCase();

//                 const indices: number[] = [];
//                 let currentIndex = 0;

//                 while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
//                     indices.push(currentIndex);
//                     currentIndex++;
//                 }

//                 const temp: string[] = []
//                 let i = 0;
//                 indices.forEach((itemm) => {
//                     temp.push((item.username as string).slice(i, itemm))
//                     temp.push((item.username as string).slice(itemm, itemm + search.length))
//                     i = itemm + search.length
//                 })

//                 temp.push((item.username as string).slice(i))

//                 item.username = (
//                     <a>
//                         {
//                             temp.map((item) => {
//                                 if (item.toLowerCase() == search) {
//                                     return (
//                                         <a style={{ backgroundColor: "yellow" }}>
//                                             {item}
//                                         </a>
//                                     )
//                                 }
//                                 else {
//                                     return (
//                                         <a>
//                                             {item}
//                                         </a>
//                                     )
//                                 }
//                             })
//                         }
//                     </a>
//                 )
//             }

//             // indexx += 1;
//         }

//     })
//     // console.log(res)
//     return res;
// }


// export function SortGroup(groups: Group[], mode: string, reverse: boolean = false, search: string = "") {
//     search = search.toLowerCase()
//     // console.log(groups[0][mode])
//     groups = sortt(groups, mode, reverse)

//     type temping = {
//         stt: number,
//         name: string,
//         group: Group
//     }
//     const res: temping[] = []
//     let indexx = 1;
//     groups.forEach((item: Group) => {

//         if (search == "") {
//             res.push({
//                 stt: indexx,
//                 name: item.groupname as string,
//                 group: item
//             })
//             indexx += 1;
//         }
//         else if ((item.groupname as string).toLowerCase().includes(search)) {
//             res.push({
//                 stt: indexx,
//                 name: item.groupname as string,
//                 group: item
//             })
//             const string = (item.groupname as string).toLowerCase();

//             const indices: number[] = [];
//             let currentIndex: number = 0;

//             while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
//                 indices.push(currentIndex);
//                 currentIndex++;
//             }

//             const temp: string[] = []
//             let i = 0;

//             // console.log(item.groupname.)
//             indices.forEach((itemm) => {
//                 temp.push((item.groupname as string).slice(i, itemm))
//                 temp.push((item.groupname as string).slice(itemm, itemm + search.length))
//                 i = itemm + search.length
//             })

//             temp.push((item.groupname as string).slice(i));


//             (item.groupname as ReactElement) = (
//                 <a>
//                     {
//                         temp.map((item) => {
//                             if (item.toLowerCase() == search) {
//                                 return (
//                                     <a style={{ backgroundColor: "#999900" }}>
//                                         {item}
//                                     </a>
//                                 )
//                             }
//                             else {
//                                 return (
//                                     <a>
//                                         {item}
//                                     </a>
//                                 )
//                             }
//                         })
//                     }
//                 </a>
//             )
//             indexx += 1
//         }

//     })
//     return res;

// }


// export function ConvertToPage(list: any[], size: number): any[] {
//     return list.reduce((chunks, item, index) => {
//         const chunkIndex = Math.floor(index / size);
//         if (!chunks[chunkIndex]) {
//             chunks[chunkIndex] = [];
//         }
//         chunks[chunkIndex].push(item);
//         return chunks;
//     }, []);
// }


// export function getGroup(users: User[]): any[] {
//     const res: Group[] = [];
//     const vs: any = {}
//     users.forEach((user) => {
//         // console.log(user.group)
//         user.group.forEach((group) => {
//             if (vs[group] == undefined) {
//                 vs[group] = 1;
//             }
//             else {
//                 vs[group] += 1;
//             }
//         })

//     })

//     const bruh = Object.keys(vs);
//     bruh.forEach((item) => {
//         if (item != "") {
//             res.push({
//                 groupname: item,
//                 unt: vs[item]
//             })
//         }


//     })
//     return res;
// }


export function getGravatarURL(email: string, size: number): string {
    // Trim leading and trailing whitespace from
    // an email address and force all characters
    // to lower case
    const address = String(email).trim().toLowerCase();

    // Create a SHA256 hash of the final string
    const hash = sha256(address);

    // Grab the actual image URL
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
}


export function cookie(document: Document): {} {
    const temp = document.cookie.split(";");
    // console.log(temp)
    let cookies: any = {};

    // console.log(url)

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

    return cookies;
}

export function geturl() {
    const url = document.URL;

    return url.split("//")[1].split("/").slice(1);
}



export async function getdata(method: string, mode: string, data: any) {
    // console.log(data)
    let res;
    if (method == "get") {
        res = await axios.get(`http://localhost:3001/data/${mode}/${data}`, {});
    }
    else if (method == "post") {
        res = await axios.post(`http://localhost:3001/data`, { mode: mode, data: data }, {});
    }
    else if (method == "delete") {
        res = await axios.delete(`http://localhost:3001/data/${mode}/${data}`, {});
    }
    else if (method == "sort") {
        res = await axios.patch(`http://localhost:3001/data`, { mode: mode, data: data }, {});
    }

    // console.log(res.data)


    // const res = await axios.post("http://localhost:3001/api/data", { method: method, mode: mode, data: data }, {});
    if (res.status != 200) {
        return `Error code: ${res.status}`;
    }
    // console.log(res.data.data)
    if (res.data.data.length < 2) {
        return res.data.data[0];
    }


    const ress = res.data.data;
    const result = Object.keys(ress).map((item) => {
        return ress[item]
    })

    if (method != "sort")
        return result;
    else
        return res
}

export const color_themes = "#ff9797"

export const color: any = {
    dark: {
        font: "#ffffff",
        background: "#6e6e6e",
        content: "#222222"
    },
    light: {
        font: "#000000",
        background: "#f8f8f8",
        content: "#ffffff"
    }
}


// export function getrank(users: User[], mode: string, user: string): number {

//     users = sortt(users, mode, true)

//     // console.log(users)
//     return users.findIndex(userr => userr.username == user) + 1;
// }


export const all_language = ["C++03", "C++11", "C++14 (C++ Themis)", "C++17", "C++20", "Python 3", "java", "javascript"];


// export function sort_blogs(blogs: Blogs[]): Blogs[] {

//     blogs.sort((a, b) => {
//         const [time_a, time_b] = [new Date(a.publish_time).getTime(), new Date(b.publish_time).getTime()];

//         // console.log(time_a, ' ', time_b)

//         return time_b - time_a;
//     })


//     return blogs;
// }
