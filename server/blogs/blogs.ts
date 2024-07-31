import { readFileSync, writeFileSync } from "fs";
import { Blog } from "type";
import { getDataFromDatabase, writeDataToDatabase } from "data";





export function get_blogs(condition: string, items: any[] = []) {
    let blogs: any[];
    if (items.length == 0 || condition == "all") {
        blogs = getDataFromDatabase("blogs", "blogs")
        if (condition == "all") {
            return blogs;
        }
    }
    else {
        blogs = items;
    }

    if (condition.includes("_")) {
        return blogs.filter((blog: Blog) => blog.id.toLowerCase().includes(condition.toLowerCase()));
    }
    return blogs.filter((blog: Blog) => blog.host.toLowerCase().includes(condition.toLowerCase()));
}

export function sort_blogs(mode: string, search: any, IsReverse: any) {

    const blogs = get_blogs("all");
    // console.log(blogs);
    try {
        // console.log(condition.toString())
        const prio = ["host", "name", "publishTime"];

        // const temping = 

        blogs.sort((a, b) => {
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

        const temping = blogs.map((blog: Blog, index: number) => {
            return {
                stt: index + 1,
                host: blog.host,
                name: blog.name,
                publishTime: blog.publishTime,
                body: blog.body,
                id: blog.id
            }
        })



        return get_blogs(search, temping);
    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}





export function add_blogs(blog: { id: any; }) {
    const blogs = getDataFromDatabase("blogs", "blogs")
    try {
        const index = blogs.findIndex((e: { id: any; }) => e.id === blog.id);
        if (index === -1) {
            blogs.push(blog);
        }
        else {
            blogs[index] = blog;
        }

        writeDataToDatabase("blogs", "blogs", blogs)
        return "Success";

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
export function delete_blogs(id: string) {
    const blogs = getDataFromDatabase("blogs", "blogs")
    // @ts-ignore
    const index = blogs.findIndex((e: { id: any; }) => e.id == id);
    try {
        const index = blogs.findIndex((e: { id: any; }) => e.id == id);
        if (index != -1) {
            blogs.splice(index, 1)

            writeDataToDatabase("blogs", "blogs", blogs)


            return "Success";
        }
        else {
            return `Don't find ${id}`
        }

    }
    catch (e) {
        // @ts-ignore
        return e.message;
    }
}
//# sourceMappingURL=blogs.js.map