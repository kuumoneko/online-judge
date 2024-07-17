import { Group } from "types";
import { getDataFromDatabase, writeDataToDatabase } from "data";
import { get_number_users_of_group } from "../sub_servser.js";

export function get_groups(condition: string, items: any[] = []) {
    let groups: any[];
    if (items.length == 0 || condition == "all") {
        groups = getDataFromDatabase("users", "groups")
        if (condition == "all") {
            return groups;
        }
    }
    else {
        groups = items;
    }
    return groups.filter((group: any) => group.groupname == condition);
}

export function sort_groups(mode: string, search: string, IsReverse: any) {

    const groups = getDataFromDatabase("users", "groups")
    try {
        const prio = ["unt", "groupname", "isPublic"];

        groups.sort((a: any, b: any) => {
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
                unt: get_number_users_of_group(group.groupname as string),
            }
        })

        return [
            ...temping.filter((user: Group) => user.groupname == search),
            ...temping.filter((user: Group) => (user.groupname as string).includes(search))
        ]
    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}


export function add_groups(group: Group) {
    const groups = getDataFromDatabase("users", "groups");
    try {
        const index = groups.findIndex((e: Group) => e.groupname === group.groupname);
        if (index === -1) {
            groups.push(group);
        }
        else {
            groups[index] = group;
        }
        writeDataToDatabase("users", "groups", groups)
        return "Success";

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
export function delete_groups(groupname: string) {
    const groups = getDataFromDatabase("users", "groups");
    // @ts-ignore
    try {
        const index = groups.findIndex((e: any) => e.groupname == groupname);
        if (index != -1) {
            groups.splice(index, 1)
            writeDataToDatabase("users", "groups", groups)
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