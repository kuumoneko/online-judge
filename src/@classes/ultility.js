var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { sha256 } from "js-sha256";
import React from "react";
import { User_role } from "./enum.js";
const rank_color = {
    "Newbie": "#808080",
    "Pupil": "#008000",
    "Specialist": "#03a89e",
    "Expert": "#0000ff",
    "Candidate Master": "#aa00aa",
    "Master": "#ff8c00",
    "Grandmaster": "#ff1a1a",
};
export function get_rank_color(points, role, themes = color_themes) {
    if (role == User_role.administrator) {
        return themes;
    }
    if (points < 1200) {
        return rank_color.Newbie;
    }
    if (points >= 1200 && points <= 1399) {
        return rank_color.Pupil;
    }
    if (points >= 1400 && points <= 1599) {
        return rank_color.Specialist;
    }
    if (points >= 1600 && points <= 1899) {
        return rank_color.Expert;
    }
    if (points >= 1900 && points <= 2199) {
        return rank_color["Candidate Master"];
    }
    if (points >= 2200 && points <= 2399) {
        return rank_color.Master;
    }
    if (points >= 2400) {
        return rank_color.Grandmaster;
    }
    return rank_color.Newbie;
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function sortt(lists, mode, reverse = false) {
    const prio = ["rank", "points", "problems_count", "username", "fullname", "unt", "group"];
    lists.sort((a, b) => {
        if (a[mode] != b[mode]) {
            return (a[mode] - b[mode]) * (reverse ? -1 : 1);
        }
        else {
            for (let i = 0; i < prio.length; i++) {
                const item = prio[i];
                if (item != mode) {
                    if (a[item] != b[item]) {
                        return (a[item] - b[item]) * (reverse ? -1 : 1);
                    }
                }
            }
            return 0;
        }
    });
    return lists;
}
export function SortUser(users, mode, reverse = false, search = "") {
    search = search.toLowerCase();
    users = sortt(users, mode, reverse);
    const res = [];
    let indexx = 1;
    users.forEach((item, index) => {
        if (search == "") {
            res.push({
                stt: index + 1,
                username: item.username,
                user: item
            });
        }
        else if (item.fullname.toLowerCase().includes(search) || item.username.toLowerCase().includes(search)) {
            res.push({
                stt: index + 1,
                username: item.username,
                user: item
            });
            if (item.fullname.toLowerCase().includes(search)) {
                const string = item.fullname.toLowerCase();
                const indices = [];
                let currentIndex = 0;
                while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
                    indices.push(currentIndex);
                    currentIndex++;
                }
                const temp = [];
                let i = 0;
                indices.forEach((itemm) => {
                    temp.push(item.fullname.slice(i, itemm));
                    temp.push(item.fullname.slice(itemm, itemm + search.length));
                    i = itemm + search.length;
                });
                temp.push(item.fullname);
                item.fullname = (React.createElement("a", null, temp.map((item) => {
                    if (item.toLowerCase() == search) {
                        return (React.createElement("a", { style: { backgroundColor: "yellow" } }, item));
                    }
                    else {
                        return (React.createElement("a", null, item));
                    }
                })));
            }
            if (item.username.toLowerCase().includes(search)) {
                const string = item.username.toLowerCase();
                const indices = [];
                let currentIndex = 0;
                while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
                    indices.push(currentIndex);
                    currentIndex++;
                }
                const temp = [];
                let i = 0;
                indices.forEach((itemm) => {
                    temp.push(item.username.slice(i, itemm));
                    temp.push(item.username.slice(itemm, itemm + search.length));
                    i = itemm + search.length;
                });
                temp.push(item.username.slice(i));
                item.username = (React.createElement("a", null, temp.map((item) => {
                    if (item.toLowerCase() == search) {
                        return (React.createElement("a", { style: { backgroundColor: "yellow" } }, item));
                    }
                    else {
                        return (React.createElement("a", null, item));
                    }
                })));
            }
        }
    });
    return res;
}
export function SortGroup(groups, mode, reverse = false, search = "") {
    search = search.toLowerCase();
    groups = sortt(groups, mode, reverse);
    const res = [];
    let indexx = 1;
    groups.forEach((item) => {
        if (search == "") {
            res.push({
                stt: indexx,
                name: item.group,
                group: item
            });
            indexx += 1;
        }
        else if (item.group.toLowerCase().includes(search)) {
            res.push({
                stt: indexx,
                name: item.group,
                group: item
            });
            const string = item.group.toLowerCase();
            const indices = [];
            let currentIndex = 0;
            while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
                indices.push(currentIndex);
                currentIndex++;
            }
            const temp = [];
            let i = 0;
            indices.forEach((itemm) => {
                temp.push(item.group.slice(i, itemm));
                temp.push(item.group.slice(itemm, itemm + search.length));
                i = itemm + search.length;
            });
            temp.push(item.group.slice(i));
            item.group = (React.createElement("a", null, temp.map((item) => {
                if (item.toLowerCase() == search) {
                    return (React.createElement("a", { style: { backgroundColor: "#999900" } }, item));
                }
                else {
                    return (React.createElement("a", null, item));
                }
            })));
            indexx += 1;
        }
    });
    return res;
}
export function ConvertToPage(list, size) {
    return list.reduce((chunks, item, index) => {
        const chunkIndex = Math.floor(index / size);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(item);
        return chunks;
    }, []);
}
export function getGroup(users) {
    const res = [];
    const vs = {};
    users.forEach((user) => {
        user.group.forEach((group) => {
            if (vs[group] == undefined) {
                vs[group] = 1;
            }
            else {
                vs[group] += 1;
            }
        });
    });
    const bruh = Object.keys(vs);
    bruh.forEach((item) => {
        if (item != "") {
            res.push({
                group: item,
                unt: vs[item]
            });
        }
    });
    return res;
}
export function getGravatarURL(email, size) {
    const address = String(email).trim().toLowerCase();
    const hash = sha256(address);
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
}
export function cookie(document) {
    const temp = document.cookie.split(";");
    let cookies = {};
    temp.forEach((cookie) => {
        const lmao = cookie.split("=");
        if (lmao[0] != "") {
            while (lmao[0][0] == " ") {
                lmao[0] = lmao[0].slice(1);
            }
            while (lmao[0][lmao[0].length - 1] == " ") {
                lmao[0] = lmao[0].slice(0, lmao[0].length - 2);
            }
            while (lmao[1][0] == " ") {
                lmao[1] = lmao[1].slice(1);
            }
            while (lmao[1][lmao[1].length - 1] == " ") {
                lmao[1] = lmao[1].slice(0, lmao[1].length - 2);
            }
            cookies[lmao[0]] = lmao[1];
        }
    });
    return cookies;
}
export function geturl() {
    const url = document.URL;
    return url.split("//")[1].split("/").slice(1);
}
export function getdata(method, mode, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        if (method == "get") {
            res = yield axios.post(`http://localhost:3001/get/${mode}`, { data: data }, {});
        }
        else {
            res = yield axios.post(`http://localhost:3001/post/${mode}`, { data: data }, {});
        }
        if (res.status != 200) {
            return `Error code: ${res.status}`;
        }
        if (res.data.data.length < 2) {
            return res.data.data[0];
        }
        const ress = res.data.data;
        const result = Object.keys(ress).map((item) => {
            return ress[item];
        });
        return result;
    });
}
export const color_themes = "#ff9797";
export const color = {
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
};
export function getrank(users, mode, user) {
    users = sortt(users, mode, true);
    return users.findIndex(userr => userr.username == user) + 1;
}
export const all_language = ["C++03", "C++11", "C++14 (C++ Themis)", "C++17", "C++20", "Python 3", "java", "javascript"];
export function sort_blogs(blogs) {
    blogs.sort((a, b) => {
        const [time_a, time_b] = [new Date(a.publish_time).getTime(), new Date(b.publish_time).getTime()];
        return time_b - time_a;
    });
    return blogs;
}
//# sourceMappingURL=ultility.js.map