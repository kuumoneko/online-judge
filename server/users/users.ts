import { User } from "types";
import { getDataFromDatabase, writeDataToDatabase } from "data";

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

export function sort_users(mode: string, search: string, IsReverse: any) {

    const users = getDataFromDatabase("users", "users");
    try {
        const prio = ["rank", "points", "problems_count", "username", "fullname"];


        users.sort((a: any, b: any) => {
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

        const a = temping.filter((user: User) => user.username == search || user.fullname == search);
        const b = temping.filter((user: User) => (user.username as string).includes(search) || (user.fullname as string).includes(search));

        if (b == a) {
            return temping.filter((user: User) => user.username == search || user.fullname == search)
        }
        return [
            ...temping.filter((user: User) => user.username == search || user.fullname == search),
            ...temping.filter((user: User) => (user.username as string).includes(search) || (user.fullname as string).includes(search))
        ]
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

        writeDataToDatabase("users", "users", users)
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
    try {
        const index = users.findIndex((e: User) => e.username == username);
        if (index != -1) {
            users.splice(index, 1)
            writeDataToDatabase("users", "users", users);
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