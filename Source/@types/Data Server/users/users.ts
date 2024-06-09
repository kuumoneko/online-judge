import { User } from "online-judge-types";
import { getDataFromDatabase, writeDataToFile } from "online-judge-data";

export function get_users(condition: string, items: any[] = []) {
    let users: any[];
    if (items.length == 0 || condition == "all") {
        users = getDataFromDatabase("users", "users");
        if (condition == "all") {
            return users;
        }
    }
    else {
        users = items;
    }

    return users.filter((user: any) => user.username == condition);
}

export function sort_users(mode: string, search: any, IsReverse: any) {

    const users = getDataFromDatabase("users", "users");
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

        if (search.find != undefined) {
            if (search.mode == "all")
                return temping.filter((user: any) => user.username.toLowerCase().includes(search.find.toLowerCase()) || user.fullname.toLowerCase().includes(search.find.toLowerCase()));
            else if (search.mode == "username")
                return temping.filter((user: any) => user.username.toLowerCase().includes(search.find.toLowerCase()));
            else if (search.mode == "fullname")
                return temping.filter((user: any) => user.fullname.toLowerCase().includes(search.find.toLowerCase()));
        }
        else {
            return temping.filter((user: any) => user.username == search.search);
        }
    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
export function add_users(user: { username: any; }) {
    const users = getDataFromDatabase("users", "users");
    try {
        const index = users.findIndex((e: { username: any; }) => e.username === user.username);
        if (index === -1) {
            users.push(user);
        }
        else {
            users[index] = user;
        }

        writeDataToFile("users", "users" , users)
        // writeFileSync("G:\\Project\\Data\\users.json", JSON.stringify(users), { encoding: "utf-8" })
        return "Success";

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
export function delete_users(username: string) {
    const users = getDataFromDatabase("users", "users");
    // @ts-ignore
    const index = users.findIndex((e: { username: any; }) => e.username == username);
    try {
        const index = users.findIndex((e: { username: any; }) => e.username == username);
        if (index != -1) {
            users.splice(index, 1)

            writeDataToFile("users", "users", users);
            // writeFileSync("G:\\Project\\Data\\users.json", JSON.stringify(users), { encoding: "utf-8" })


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