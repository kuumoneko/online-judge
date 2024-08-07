import { Problems } from "type";
import { getDataFromDatabase, writeDataToDatabase } from "data";


export function get_problems(condition: string, items: any[] = []) {
    let problems: any[];
    if (items.length == 0 || condition == "all") {
        problems = getDataFromDatabase("problems", "problems")
        if (condition == "all") {
            return problems;
        }
    }
    else {
        problems = items;
    }

    return [
        ...problems.filter((problem: any) => problem.id.toLowerCase() == condition.toLowerCase()),
        ...problems.filter((problem: any) => problem.name.toLowerCase().includes(condition.toLowerCase()))
    ]
}

export function sort_problems(mode: string, search: {
    name: string,
    type: string,
    group: string,
    point: {
        min: number,
        max: number
    },
    IsSample: boolean,
    AC: number
}, IsReverse: any) {

    // search: name , groups , types , %AC (AC / total) , time , IsSample

    let problems = get_problems(search.name);


    if (search.type != "all") {
        problems = problems.filter((problem: Problems) => problem.types.includes(search.type))
    }


    if (search.group != "all") {
        problems = problems.filter((problem: Problems) => problem.groups.includes(search.group))
    }


    problems = problems.filter((problem: Problems) => problem.points >= search.point.min && problem.points <= search.point.max)



    try {
        // console.log(condition.toString())
        const prio = ["name", "points", "publishTime", "host"];
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
            let temp: any = problem;
            temp.index = index + 1;
            return temp
        })


        if (search.name == "all" || search.name == "") {
            return temping;
        }
        else {
            return [
                ...temping.filter((problem: Problems) => problem.name.toLowerCase() == search.name.toLowerCase()),
                ...temping.filter((problem: Problems) => problem.name.toLowerCase().includes(search.name.toLowerCase()))
            ]
        }

        // return get_problems(search, temping);
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
            problem.name.length < 1 ||

            problem.points < 1 ||
            Object.keys(problem.specificLanguage).length < 1
        ) {
            throw new Error("Unvalid problems")
        }


        const problems = getDataFromDatabase("problems", "problems")
        const index = problems.findIndex((e: Problems) => e.name === problem.name);
        if (index === -1) {
            problems.push(problem);
        }
        else {
            problems[index] = problem;
        }

        writeDataToDatabase("problems", "problems", problems)
        return "Success"
    }
    catch (e: any) {
        // @ts-ignore
        return e.message
    }
}
export function delete_problems(name: string) {
    const problems = getDataFromDatabase("problems", "problems")
    // @ts-ignore
    const index = problems.findIndex((e: Problems) => e.name == name);
    try {
        const index = problems.findIndex((e: Problems) => e.name == name);
        if (index != -1) {
            problems.splice(index, 1)
            writeDataToDatabase("problems", "problems", problems)
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