import { getDataFromDatabase, writeDataToDatabase } from "ultility/data.js";

export function get_sessions(condition: string) {
    const sessions: any[] = getDataFromDatabase("auth", "login")

    return sessions.filter((session: any) => session.id == condition);
}

export function add_sessions(session: any) {
    let sessions: any[] = getDataFromDatabase("auth", "login")

    // let test_device = sessions.filter((item: any) => item.username == session.username)
    // // console.log(test_device)
    // if (test_device.length > 0) {
    //     sessions.splice(sessions.findIndex((item: any) => item.username == session.username), 1);
    // }
    sessions.push(session)
    writeDataToDatabase("auth", "login", sessions)
    return "oke"
}

export function delete_sessions(session: string) {
    let sessions: any[] = getDataFromDatabase("auth", "login")

    let test_device = sessions.filter((item: any) => item.id == session)
    if (test_device.length > 0) {
        sessions.splice(sessions.findIndex((item: any) => item.id == session), 1);
    }

    writeDataToDatabase("auth", "login", sessions)
    return "oke"
}