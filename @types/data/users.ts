import axios from "axios";
import { User } from "../@classes/type.js";

export async function get_user(data: string): Promise<string | User[]> {
    const temp = (user: User) => user.username == data;


    const res = await axios.get(`http://localhost:3001/data/users/${temp}`, {});
    return res.data
}


export async function add_user(data: User): Promise<string | User[]> {
    const res = await axios.post(`http://localhost:3001/data`, { mode: "users", data: data }, {});
    return res.data
}


export async function delete_user(data: string): Promise<string | User[]> {
    const res = await axios.delete(`http://localhost:3001/data/users/${data}`, {});
    return res.data
}


export async function sort_users(data: {
    mode: string, reverse: boolean, lineperpage: 100, page: 2
}) {
    const res = await axios.patch(`http://localhost:3001/data/users`,
        {
            mode: "users",
            data:
            {
                data: data.mode,
                reverse: data.reverse
            },
            lineperpage: data.lineperpage,
            page: data.page
        }, {})
}