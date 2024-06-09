import { readFileSync, writeFileSync } from "fs";
import { Problems } from "online-judge-types";
export function all_problems() {
    const problems = readFileSync("G:\\Project\\Data\\problems.json", { encoding: "utf-8" });
    return JSON.parse(problems);
}




export function get_problems(condition: string, items: any[] = []) {
    let problems: any[];
    if (items.length == 0 || condition == "all") {
        problems = all_problems();
        if (condition == "all") {
            return problems;
        }
    }
    else {
        problems = items;
    }

    if (condition.includes("_")) {
        return problems.filter((problem: any) => problem.id.toLowerCase().includes(condition.toLowerCase()));
    }
    return problems.filter((problem: any) => problem.title.toLowerCase().includes(condition.toLowerCase()));
}

export function sort_problems(mode: string, search: any, IsReverse: any) {

    const problems = get_problems("all");
    // console.log(problems);
    try {
        // console.log(condition.toString())
        const prio = ["title", "publish_time", "usr"];
        // const temping = 

        problems.sort((a, b) => {
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

        const temping = problems.map((problem: Problems, index: number) => {
            return {
                stt: index + 1,

                host: problem.host,
                publish_time: problem.publish_time,
                isPublished: problem.isPublished,
                isPrivate: problem.isPrivate,
                groups: problem.groups,
                name: problem.name,

                title: problem.title,
                data: problem.data,


                points: problem.points,
                // time_limit: problem.time_limit,
                // memory: problem.memory,
                hint: {
                    nani: problem.hint.nani,
                    data: problem.hint.data
                },

                source: problem.source,
                type: problem.type,
                limit: problem.limit,

            }
        })



        return get_problems(search, temping);
    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}


export function add_problems(problem: Problems) {



    try {
        if (
            problem.name.length < 1 ||
            problem.title.length < 1 ||

            problem.points < 1 ||
            Object.keys(problem.limit).length < 1
        ) {
            throw new Error("Unvalid problems")
        }


        const problems = all_problems();
        const index = problems.findIndex((e: Problems) => e.name === problem.name);
        if (index === -1) {
            problems.push(problem);
        }
        else {
            problems[index] = problem;
        }

        writeFileSync("G:\\Project\\Data\\problems.json", JSON.stringify(problems), { encoding: "utf-8" })
        return "Success"

    }
    catch (e: any) {
        // @ts-ignore
        return e.message
    }
}
export function delete_problems(name: string) {
    const problems = all_problems();
    // @ts-ignore
    const index = problems.findIndex((e: Problems) => e.name == name);
    try {
        const index = problems.findIndex((e: Problems) => e.name == name);
        if (index != -1) {
            problems.splice(index, 1)

            writeFileSync("G:\\Project\\Data\\problems.json", JSON.stringify(problems), { encoding: "utf-8" })


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
//# sourceMappingURL=problems.js.map