import { getDataFromDatabase } from "data";



export function getdata(folder: string, filename: string, condition: any): any[] {
    const data = getDataFromDatabase(folder, filename);

    return data.filter(condition);
}

export function sortdata(folder: string, filename: string, sortMode: string, IsReverse: boolean = false): any[] {
    const data: any[] = getDataFromDatabase(folder, filename);

    const prio: string[] = [
        // users/users
        "points", "rank",
        // users/groups

        //problems/problems

        // problems/types

        // problems/groups

        // problems/comments

        // blogs/blogs

        // blogs/comments

        // contests/contests

        // contests/users

        // contests/groups

        // contests/problems

        // contests/comments

    ];

    data.sort((a: any, b: any) => {
        if (a[sortMode] != b[sortMode]) {
            return (a[sortMode] - b[sortMode]) * (IsReverse ? -1 : 1)
        }
        else {
            for (let i = 0; i < prio.length; i++) {
                const item = prio[i];
                if (item != sortMode) {
                    if (a[item] != b[item]) {
                        return (a[item] - b[item]) * (IsReverse ? -1 : 1)
                    }
                }
            }
            return 0;
        }
    });

    return data;

}

export function sort_comments(folder: string, filename: string, id: string, sortMode: string, IsReverse: boolean = false): any[] {

    const data: any[] = getDataFromDatabase(folder, filename);


    data.sort((a: any, b: any) => {
        const a_time = new Date(a.time).getTime();
        const b_time = new Date(b.time).getTime();

        return a_time - b_time;

    })

    return data
}
