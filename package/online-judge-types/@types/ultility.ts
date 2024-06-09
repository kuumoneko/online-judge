import axios from "axios"
import { sha256 } from "js-sha256"
import { User_role } from "./enum.js";

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
    try {
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
        else if (method == "login") {
            res = await axios.post("http://localhost:3001/auth/login", { data }, { withCredentials: true })
        }
        else if (method == "auth") {
            res = await axios.post("http://localhost:3001/auth/me", {}, { withCredentials: true })
        }
        else if (method == "logout") {
            res = await axios.post("http://localhost:3001/auth/logout", {}, { withCredentials: true })
        }
        else if (method == "signup") {
            res = await axios.post("http://localhost:3001/auth/signup", { data }, { withCredentials: true })
        }
        else if (method == "verify") {
            res = await axios.post(`http://localhost:3001/verify/${data.username}/${data.code}`, {}, {});
        }
    }
    catch (e: any) {
        // console.log(e.response)
        // if (e.response.status == 404) {
        //     return e.response.data.message
        // }
        // console.log(e)
        // console.log(e.response)
        if (method == "verify") {
            return e.response.data
        }
        // console.lo
        return e.response.data.message
        // return []
    }


    // console.log(res)
    if (method == "login" || method == "signup" || method == "auth" || method == "logout" || method == "verify" || method == "post") {
        return {
            status: res.status,
            data: res.data.data
        };
    }
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

export const all_language = ["C++03", "C++11", "C++14 (C++ Themis)", "C++17", "C++20", "Python 3", "java", "javascript"];