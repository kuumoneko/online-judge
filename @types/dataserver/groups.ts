import { readFileSync, writeFileSync } from "fs";
import { Group } from "../@classes/type.js";
export function all_groups() {
    const groups = readFileSync("G:\\Online Judge Data\\groups.json", { encoding: "utf-8" });
    return JSON.parse(groups);
}







export function get_groups(condition: string, items: any[] = []) {
    let groups: any[];
    if (items.length == 0 || condition == "all") {
        groups = all_groups();
        if (condition == "all") {
            return groups;
        }
    }
    else {
        groups = items;
    }

    // console.log()

    return groups.filter((group: any) => group.groupname.toLowerCase().includes(condition.toLowerCase()));
}

export function sort_groups(mode: string, search: any, IsReverse: any) {

    const groups = get_groups("all");
    // console.log(groups);
    try {
        // console.log(condition.toString())
        const prio = ["unt", "groupname", "public"];

        // const temping = 

        groups.sort((a, b) => {
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

        const temping = groups.map((group: Group, index: number) => {
            return {
                stt: index + 1,
                groupname: group.groupname,
                unt: group.unt,
            }
        })
        // console.log(temping)


        return get_groups(search, temping);
    }
    catch (e) {
        // @ts-ignore
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

        writeFileSync("G:\\Online Judge Data\\groups.json", JSON.stringify(groups), { encoding: "utf-8" })
        return "Success";

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
export function delete_groups(groupname) {
    const groups = all_groups();
    // @ts-ignore
    const index = groups.findIndex(e => e.groupname == groupname);
    try {
        const index = groups.findIndex(e => e.groupname == groupname);
        if (index != -1) {
            groups.splice(index, 1)

            writeFileSync("G:\\Online Judge Data\\groups.json", JSON.stringify(groups), { encoding: "utf-8" })


            return "Success";
        }
        else {
            return `Don't find ${groupname}`
        }

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
//# sourceMappingURL=groups.js.map