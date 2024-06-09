import { readFileSync, writeFileSync } from "fs";
export function all_groups() {
    const groups = readFileSync("G:\\Project\\Data\\groups.json", { encoding: "utf-8" });
    return JSON.parse(groups);
}
export function get_groups(condition, items = []) {
    let groups;
    if (items.length == 0 || condition == "all") {
        groups = all_groups();
        if (condition == "all") {
            return groups;
        }
    }
    else {
        groups = items;
    }
    return groups.filter((group) => group.groupname.toLowerCase().includes(condition.toLowerCase()));
}
export function sort_groups(mode, search, IsReverse) {
    const groups = get_groups("all");
    try {
        const prio = ["unt", "groupname", "public"];
        groups.sort((a, b) => {
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
        const temping = groups.map((group, index) => {
            return {
                stt: index + 1,
                groupname: group.groupname,
                unt: group.unt,
            };
        });
        return get_groups(search, temping);
    }
    catch (e) {
        return e.message;
    }
}
export function add_groups(group) {
    const groups = all_groups();
    try {
        const index = groups.findIndex(e => e.groupname === group.groupname);
        if (index === -1) {
            groups.push(group);
        }
        else {
            groups[index] = group;
        }
        writeFileSync("G:\\Project\\Data\\groups.json", JSON.stringify(groups), { encoding: "utf-8" });
        return "Success";
    }
    catch (e) {
        return e.message;
    }
}
export function delete_groups(groupname) {
    const groups = all_groups();
    const index = groups.findIndex(e => e.groupname == groupname);
    try {
        const index = groups.findIndex(e => e.groupname == groupname);
        if (index != -1) {
            groups.splice(index, 1);
            writeFileSync("G:\\Project\\Data\\groups.json", JSON.stringify(groups), { encoding: "utf-8" });
            return "Success";
        }
        else {
            return `Don't find ${groupname}`;
        }
    }
    catch (e) {
        return e.message;
    }
}
//# sourceMappingURL=groups.js.map