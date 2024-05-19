import { readFileSync, writeFileSync } from "fs";
export function all_problems() {
    const problems = readFileSync("G:\\Online Judge Data\\problems.json", { encoding: "utf-8" });
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
                pushlish_time: problem.pushlish_time,
                public: problem.public,
                id: problem.id,
                title: problem.title,
                data: problem.data,
                html: problem.html,
                points: problem.points,
                time_limit: problem.time_limit,
                memory: problem.memory,
                input: problem.input,
                output: problem.output,
                hint: {
                    nani: problem.hint.nani,
                    data: problem.hint.data,
                    html: problem.hint.html
                },
                src: problem.src,
                type: problem.type,
                supported_language: problem.supported_language,
            };
        });
        return get_problems(search, temping);
    }
    catch (e) {
        return e.message;
    }
}
export function add_problems(problem) {
    const problems = all_problems();
    try {
        const index = problems.findIndex(e => e.id === problem.id);
        if (index === -1) {
            problems.push(problem);
        }
        else {
            problems[index] = problem;
        }
        writeFileSync("G:\\Online Judge Data\\problems.json", JSON.stringify(problems), { encoding: "utf-8" });
        return "Success";
    }
    catch (e) {
        return e.message;
    }
}
export function delete_problems(id) {
    const problems = all_problems();
    const index = problems.findIndex(e => e.id == id);
    try {
        const index = problems.findIndex(e => e.id == id);
        if (index != -1) {
            problems.splice(index, 1);
            writeFileSync("G:\\Online Judge Data\\problems.json", JSON.stringify(problems), { encoding: "utf-8" });
            return "Success";
        }
        else {
            return `Don't find ${id}`;
        }
    }
    catch (e) {
        return e.message;
    }
}
//# sourceMappingURL=problems.js.map