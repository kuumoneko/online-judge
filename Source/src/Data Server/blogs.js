import { readFileSync, writeFileSync } from "fs";
export function all_blogs() {
    const blogs = readFileSync("G:\\Project\\Data\\blogs.json", { encoding: "utf-8" });
    return JSON.parse(blogs);
}
export function get_blogs(condition, items = []) {
    let blogs;
    if (items.length == 0 || condition == "all") {
        blogs = all_blogs();
        if (condition == "all") {
            return blogs;
        }
    }
    else {
        blogs = items;
    }
    if (condition.includes("_")) {
        return blogs.filter((blog) => blog.id.toLowerCase().includes(condition.toLowerCase()));
    }
    return blogs.filter((blog) => blog.host.toLowerCase().includes(condition.toLowerCase()));
}
export function sort_blogs(mode, search, IsReverse) {
    const blogs = get_blogs("all");
    try {
        const prio = ["usr", "id", "title", "publish_time"];
        blogs.sort((a, b) => {
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
        const temping = blogs.map((blog, index) => {
            return {
                stt: index + 1,
                host: blog.host,
                title: blog.title,
                publish_time: blog.publish_time,
                content: blog.content,
                html: blog.html,
                id: blog.id
            };
        });
        return get_blogs(search, temping);
    }
    catch (e) {
        return e.message;
    }
}
export function add_blogs(blog) {
    const blogs = all_blogs();
    try {
        const index = blogs.findIndex((e) => e.id === blog.id);
        if (index === -1) {
            blogs.push(blog);
        }
        else {
            blogs[index] = blog;
        }
        writeFileSync("G:\\Project\\Data\\blogs.json", JSON.stringify(blogs), { encoding: "utf-8" });
        return "Success";
    }
    catch (e) {
        return e.message;
    }
}
export function delete_blogs(id) {
    const blogs = all_blogs();
    const index = blogs.findIndex((e) => e.id == id);
    try {
        const index = blogs.findIndex((e) => e.id == id);
        if (index != -1) {
            blogs.splice(index, 1);
            writeFileSync("G:\\Project\\Data\\blogs.json", JSON.stringify(blogs), { encoding: "utf-8" });
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
//# sourceMappingURL=blogs.js.map