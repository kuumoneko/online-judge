
import { ProblemsGroup } from "type";
import { getDataFromDatabase, writeDataToDatabase } from "data";


export function get_problem_groups(condition: string, items: any[] = []) {
    let problem_groups: any[];
    if (items.length == 0 || condition == "all") {
        problem_groups = getDataFromDatabase("problems", "groups")
        if (condition == "all") {
            return problem_groups;
        }
    }
    else {
        problem_groups = items;
    }

    if (condition.includes("_")) {
        return problem_groups.filter((problem_group: any) => problem_group.id.toLowerCase().includes(condition.toLowerCase()));
    }
    return problem_groups.filter((problem_group: any) => problem_group.title.toLowerCase().includes(condition.toLowerCase()));
}

export function sort_problem_groups(mode: string, search: any, IsReverse: any) {

    const problem_groups = get_problem_groups("all");
    // console.log(problem_groups);
    try {
        // console.log(condition.toString())
        const prio = ["name"];
        // const temping = 

        problem_groups.sort((a, b) => {
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

        const temping = problem_groups.map((problem_group: ProblemsGroup, index: number) => {
            return {
                stt: index + 1,
                id: problem_group.id,
                name: problem_group.name,

                host: problem_group.host
            }
        })



        return get_problem_groups(search, temping);
    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}


export function add_problem_groups(problem_group: ProblemsGroup) {



    try {
        if (
            problem_group.name.length < 1
        ) {
            throw new Error("Unvalid problem_groups")
        }


        const problem_groups = getDataFromDatabase("problems", "groups")
        const index = problem_groups.findIndex((e: ProblemsGroup) => e.name === problem_group.name);
        if (index === -1) {
            problem_groups.push(problem_group);
        }
        else {
            problem_groups[index] = problem_group;
        }

        writeDataToDatabase("problem_groups", "problem_groups", problem_groups)
        return "Success"
    }
    catch (e: any) {
        // @ts-ignore
        return e.message
    }
}
export function delete_problem_groups(name: string) {
    const problem_groups = getDataFromDatabase("problems", "groups")
    // @ts-ignore
    const index = problem_groups.findIndex((e: problem_groups) => e.name == name);
    try {
        const index = problem_groups.findIndex((e: ProblemsGroup) => e.name == name);
        if (index != -1) {
            problem_groups.splice(index, 1)
            writeDataToDatabase("problem_groups", "problem_groups", problem_groups)
            return "Success";
        }
        else {
            throw new Error(`Can't find ${name}`)
        }

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
//# sourceMappingURL=problem_groups.js.map