import { readFileSync, writeFileSync } from "fs";


export function all_sessions() {
    const users = readFileSync("G:\\Project\\Data\\login.json", { encoding: "utf-8" });
    return JSON.parse(users);
}

export function get_sessions(condition: string) {
    const sessions: any[] = all_sessions();

    return sessions.filter((session: any) => session.id == condition);
}

export function add_sessions(session: any) {
    let sessions: any[] = all_sessions();

    let test_device = sessions.filter((item: any) => item.username == session.username)
    // console.log(test_device)
    if (test_device.length > 0) {
        sessions.splice(sessions.findIndex((item: any) => item.username == session.username), 1);

    }
    sessions.push(session)
    writeFileSync("G:\\Project\\Data\\login.json", JSON.stringify(sessions), { encoding: "utf-8" })
    return "oke"
}

export function delete_sessions(session: string) {
    let sessions: any[] = all_sessions();

    let test_device = sessions.filter((item: any) => item.id == session)
    if (test_device.length > 0) {
        sessions.splice(sessions.findIndex((item: any) => item.id == session), 1);
    }

    writeFileSync("G:\\Project\\Data\\login.json", JSON.stringify(sessions), { encoding: "utf-8" })
    return "oke"
}