import { readFileSync, writeFileSync } from "fs";
export function all_users() {
    const users = readFileSync("G:\\Online Judge Data\\users.json", { encoding: "utf-8" });
    return JSON.parse(users);
}
export function get_users(condition, items = []) {
    let users;
    if (items.length == 0 || condition == "all") {
        users = all_users();
        if (condition == "all") {
            return users;
        }
    }
    else {
        users = items;
    }
    return users.filter((user) => user.username.toLowerCase().includes(condition.toLowerCase()) || user.fullname.toLowerCase().includes(condition.toLowerCase()));
}
export function sort_users(mode, search, IsReverse) {
    const users = get_users("all");
    try {
        const prio = ["rank", "points", "problems_count", "username", "fullname"];
        users.sort((a, b) => {
            if (a[mode] != b[mode]) {
                return (a[mode] - b[mode]) * (IsReverse ? -1 : 1);
            }
            else {
                for (let i = 0; i < prio.length; i++) {
                    const item = prio[i];
                    if (item != mode) {
                        if (a[item] != b[item]) {
                            return (a[item] - b[item]) * (IsReverse ? -1 : 1);
                        }
                    }
                }
                return 0;
            }
        });
        const temping = users.map((user, index) => {
            return {
                stt: index + 1,
                fullname: user.fullname,
                username: user.username,
                group: user.group,
                points: user.points,
                problems_count: user.problems_count,
                rank: user.rank,
                role: user.role
            };
        });
        return get_users(search, temping);
    }
    catch (e) {
        return e.message;
    }
}
export function add_users(user) {
    const users = all_users();
    try {
        const index = users.findIndex((e) => e.username === user.username);
        if (index === -1) {
            users.push(user);
        }
        else {
            users[index] = user;
        }
        writeFileSync("G:\\Online Judge Data\\users.json", JSON.stringify(users), { encoding: "utf-8" });
        return "Success";
    }
    catch (e) {
        return e.message;
    }
}
export function delete_users(username) {
    const users = all_users();
    const index = users.findIndex((e) => e.username == username);
    try {
        const index = users.findIndex((e) => e.username == username);
        if (index != -1) {
            users.splice(index, 1);
            writeFileSync("G:\\Online Judge Data\\users.json", JSON.stringify(users), { encoding: "utf-8" });
            return "Success";
        }
        else {
            return `Don't find ${username}`;
        }
    }
    catch (e) {
        return e.message;
    }
}
//# sourceMappingURL=users.js.map