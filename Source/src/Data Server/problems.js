import { readFileSync, writeFileSync } from "fs";
export function all_problems() {
    const problems = readFileSync("G:\\Project\\Data\\problems.json", { encoding: "utf-8" });
    return JSON.parse(problems);
}
export function get_problems(condition, items = []) {
    let problems;
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
        return problems.filter((problem) => problem.id.toLowerCase().includes(condition.toLowerCase()));
    }
    return problems.filter((problem) => problem.title.toLowerCase().includes(condition.toLowerCase()));
}
export function sort_problems(mode, search, IsReverse) {
    const problems = get_problems("all");
    try {
        const prio = ["title", "publish_time", "usr"];
        problems.sort((a, b) => {
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
        const temping = problems.map((problem, index) => {
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
                hint: {
                    nani: problem.hint.nani,
                    data: problem.hint.data
                },
                source: problem.source,
                type: problem.type,
                limit: problem.limit,
            };
        });
        return get_problems(search, temping);
    }
    catch (e) {
        return e.message;
    }
}
export function add_problems(problem) {
    try {
        if (problem.name.length < 1 ||
            problem.title.length < 1 ||
            problem.points < 1 ||
            Object.keys(problem.limit).length < 1) {
            throw new Error("Unvalid problems");
        }
        const problems = all_problems();
        const index = problems.findIndex((e) => e.name === problem.name);
        if (index === -1) {
            problems.push(problem);
        }
        else {
            problems[index] = problem;
        }
        writeFileSync("G:\\Project\\Data\\problems.json", JSON.stringify(problems), { encoding: "utf-8" });
        return "Success";
    }
    catch (e) {
        return e.message;
    }
}
export function delete_problems(name) {
    const problems = all_problems();
    const index = problems.findIndex((e) => e.name == name);
    try {
        const index = problems.findIndex((e) => e.name == name);
        if (index != -1) {
            problems.splice(index, 1);
            writeFileSync("G:\\Project\\Data\\problems.json", JSON.stringify(problems), { encoding: "utf-8" });
            return "Success";
        }
        else {
            throw new Error(`Can't find ${name}`);
        }
    }
    catch (e) {
        return e.message;
    }
}
//# sourceMappingURL=problems.js.map