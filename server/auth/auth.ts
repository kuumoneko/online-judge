import { getDataFromDatabase, writeDataToDatabase } from "data";

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
    const temp = getime()
    sessions.push({
        id: session.id,
        username: session.username,
        end_login: temp.time,
    })
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

export function getime() {
    const now = new Date();
    console.log(now.getTime())
    console.log(new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds()).getTime())

    const time_now = now.getTime();
    const time_next_month = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
    ).getTime()

    return {
        time: time_next_month,
        duration: time_next_month - time_now
    }
}