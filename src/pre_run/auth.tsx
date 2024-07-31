import { getdata } from "ulti";

export async function auth_user() {
    const res = await getdata("auth", "users", "");
    return res.data
}