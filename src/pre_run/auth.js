import { getdata } from "ultility/ulti.js";
export async function auth_user() {
    const res = await getdata("auth", "users", "");
    return res.data;
}
//# sourceMappingURL=auth.js.map