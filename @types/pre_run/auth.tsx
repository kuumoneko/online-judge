import Cookies from "js-cookie";
import { getdata } from "types";


export async function auth_user() {
    const res = await getdata("auth", "users", "");
    return res.data
}