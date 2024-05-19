import axios from "axios";
import { Problems } from "../@classes/type.js";

export async function get_problem(data: string): Promise<string | Problems[]> {
    const temp = (problem: Problems) => problem.id == data;


    const res = await axios.get(`http://localhost:3001/data/problems/${temp}`, {});
    return res.data
}


export async function add_problem(data: Problems): Promise<string | Problems[]> {
    const res = await axios.post(`http://localhost:3001/data`, { mode: "problems", data: data }, {});
    return res.data
}


export async function delete_problem(data: string): Promise<string | Problems[]> {
    const res = await axios.delete(`http://localhost:3001/data/problems/${data}`, {});
    return res.data
}

export async function sort_problems(data: {
    mode: string, reverse: boolean, lineperpage: 100, page: 2
}) {
    const res = await axios.patch(`http://localhost:3001/data/problems`,
        {
            mode: "problems",
            data:
            {
                data: data.mode,
                reverse: data.reverse
            },
            lineperpage: data.lineperpage,
            page: data.page
        }, {})
}