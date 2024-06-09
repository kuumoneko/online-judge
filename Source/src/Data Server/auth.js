import { readFileSync, writeFileSync } from "fs";
export function all_sessions() {
    const users = readFileSync("G:\\Project\\Data\\login.json", { encoding: "utf-8" });
    return JSON.parse(users);
}
export function get_sessions(condition) {
    const sessions = all_sessions();
    return sessions.filter((session) => session.id == condition);
}
export function add_sessions(session) {
    let sessions = all_sessions();
    let test_device = sessions.filter((item) => item.username == session.username);
    if (test_device.length > 0) {
        sessions.splice(sessions.findIndex((item) => item.username == session.username), 1);
    }
    sessions.push(session);
    writeFileSync("G:\\Project\\Data\\login.json", JSON.stringify(sessions), { encoding: "utf-8" });
    return "oke";
}
export function delete_sessions(session) {
    let sessions = all_sessions();
    let test_device = sessions.filter((item) => item.id == session);
    if (test_device.length > 0) {
        sessions.splice(sessions.findIndex((item) => item.id == session), 1);
    }
    writeFileSync("G:\\Project\\Data\\login.json", JSON.stringify(sessions), { encoding: "utf-8" });
    return "oke";
}
//# sourceMappingURL=auth.js.map