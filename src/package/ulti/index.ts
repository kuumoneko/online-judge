import axios from "axios"
import { sha256 } from "js-sha256"

// function escapeRegExp(string: string) {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }

// export function replaceAll(str: string, find: string, replace: string) {
//     return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
// }

interface Random_string_Option {
    isUpper?: boolean,
    isSpecial?: boolean,
    isNumber?: boolean
}

export function generateRandomString(length: number, options: Random_string_Option = { isUpper: false, isSpecial: false, isNumber: false }) {
    let string = "abcdefghijklmnopqrstuvwxyz";
    if (options.isUpper) {
        string += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (options.isSpecial) {
        string += "!@#$%^&*()_+"
    }
    if (options.isNumber) {
        string += "0123456789"
    }

    let result = "";
    const charactersLength = string.length;
    for (let i = 0; i < length; i++) {
        result += string.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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

export async function getdata(method: string, mode: string, data: any): Promise<{
    status: number,
    data: any,
    [key: string]: any
}> {
    // console.log(data)
    let res: {
        data: {
            data: any[] | string,
        }
        status: number,
        [key: string]: any
    } = {
        data: {
            data: []
        },
        status: 200
    };
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
        else if (method == "verify_forgot_password") {
            res = await axios.post(`http://localhost:3001/forgot_password/${data.username}/${data.mode}/${data.data}`, {}, {});
        }
        else if (method == "change_password") {
            res = await axios.post("http://localhost:3001/auth/change_password", { data }, {})
        }
        else if (method == "forgot_password") {
            res = await axios.post("http://localhost:3001/auth/forgot_password", { data }, {})
        }
        else if (method == "submit") {
            res = await axios.post("http://localhost:3001/submit", { data }, {})
        }
    }

    catch (e: any) {
        // console.log(e.response.data)
        res = {
            status: e.response.status,
            data: { data: [e.response.data] }
        }
    }

    return {
        status: res.status,
        data: res.data
    }
}


export const all_language = ["C++03", "C++11", "C++14 (C++ Themis)", "C++17", "C++20", "Python 3", "Java", "Javascript", "Typescript"];

export const allowed_html_tags = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "a",
    "img",
    "br",
    "div"
]