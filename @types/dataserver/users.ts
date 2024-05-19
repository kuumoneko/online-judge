import { readFileSync, writeFileSync } from "fs";
import { User } from "../@classes/type.js";
export function all_users() {
    const users = readFileSync("G:\\Online Judge Data\\users.json", { encoding: "utf-8" });
    return JSON.parse(users);
}

export function get_users(condition: string, items: any[] = []) {
    let users: any[];
    if (items.length == 0 || condition == "all") {
        users = all_users();
        if (condition == "all") {
            return users;
        }
    }
    else {
        users = items;
    }

    return users.filter((user: any) => user.username.toLowerCase().includes(condition.toLowerCase()) || user.fullname.toLowerCase().includes(condition.toLowerCase()));
}

export function sort_users(mode: string, search: any, IsReverse: any) {

    const users = get_users("all");
    // console.log(users);
    try {
        // console.log(condition.toString())
        const prio = ["rank", "points", "problems_count", "username", "fullname"];

        // const temping = 

        users.sort((a, b) => {
            if (a[mode] != b[mode]) {
                return (a[mode] - b[mode]) * (IsReverse ? -1 : 1)
            }
            else {
                for (let i = 0; i < prio.length; i++) {
                    const item = prio[i];
                    if (item != mode) {
                        if (a[item] != b[item]) {
                            return (a[item] - b[item]) * (IsReverse ? -1 : 1)
                        }
                    }
                }
                return 0;
            }
        });

        const temping = users.map((user: User, index: number) => {
            return {
                stt: index + 1,
                fullname: user.fullname,
                username: user.username,
                group: user.group,
                points: user.points,
                problems_count: user.problems_count,
                rank: user.rank,
                role: user.role
            }
        })



        return get_users(search, temping);
    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
export function add_users(user: { username: any; }) {
    const users = all_users();
    try {
        const index = users.findIndex((e: { username: any; }) => e.username === user.username);
        if (index === -1) {
            users.push(user);
        }
        else {
            users[index] = user;
        }

        writeFileSync("G:\\Online Judge Data\\users.json", JSON.stringify(users), { encoding: "utf-8" })
        return "Success";

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
export function delete_users(username: string) {
    const users = all_users();
    // @ts-ignore
    const index = users.findIndex((e: { username: any; }) => e.username == username);
    try {
        const index = users.findIndex((e: { username: any; }) => e.username == username);
        if (index != -1) {
            users.splice(index, 1)

            writeFileSync("G:\\Online Judge Data\\users.json", JSON.stringify(users), { encoding: "utf-8" })


            return "Success";
        }
        else {
            return `Don't find ${username}`
        }

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
//# sourceMappingURL=users.js.map