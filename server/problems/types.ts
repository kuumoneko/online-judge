
import { ProblemsType } from "types";
import { getDataFromDatabase, writeDataToDatabase } from "data";


export function get_problem_types(condition: string, items: any[] = []) {
    let problem_types: any[];
    if (items.length == 0 || condition == "all") {
        problem_types = getDataFromDatabase("problems", "types")
        if (condition == "all") {
            return problem_types;
        }
    }
    else {
        problem_types = items;
    }

    if (condition.includes("_")) {
        return problem_types.filter((problem_type: any) => problem_type.id.toLowerCase().includes(condition.toLowerCase()));
    }
    return problem_types.filter((problem_type: any) => problem_type.title.toLowerCase().includes(condition.toLowerCase()));
}

export function sort_problem_types(mode: string, search: any, IsReverse: any) {

    const problem_types = get_problem_types("all");
    // console.log(problem_types);
    try {
        // console.log(condition.toString())
        const prio = ["name"];
        // const temping = 

        problem_types.sort((a, b) => {
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

        const temping = problem_types.map((problem_type: ProblemsType, index: number) => {
            return {
                stt: index + 1,
                id: problem_type.id,
                name: problem_type.name,

                host: problem_type.host
            }
        })



        return get_problem_types(search, temping);
    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}


export function add_problem_types(problem_type: ProblemsType) {



    try {
        if (
            problem_type.name.length < 1
        ) {
            throw new Error("Unvalid problem_types")
        }


        const problem_types = getDataFromDatabase("problems", "types")
        const index = problem_types.findIndex((e: ProblemsType) => e.name === problem_type.name);
        if (index === -1) {
            problem_types.push(problem_type);
        }
        else {
            problem_types[index] = problem_type;
        }

        writeDataToDatabase("problem_types", "problem_types", problem_types)
        return "Success"
    }
    catch (e: any) {
        // @ts-ignore
        return e.message
    }
}
export function delete_problem_types(name: string) {
    const problem_types = getDataFromDatabase("problems", "types")
    // @ts-ignore
    const index = problem_types.findIndex((e: problem_types) => e.name == name);
    try {
        const index = problem_types.findIndex((e: ProblemsType) => e.name == name);
        if (index != -1) {
            problem_types.splice(index, 1)
            writeDataToDatabase("problem_types", "problem_types", problem_types)
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
//# sourceMappingURL=problem_types.js.map