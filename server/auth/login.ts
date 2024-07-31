import { getDataFromDatabase } from "data";
import { generateRandomString } from "ulti";
import { add_sessions } from "./auth.ts";


export function login(username: string, password: string): { message: string, session: any } {
    const temp: any[] = getDataFromDatabase("users", "passwords");
    const user = temp.find((item: any) => item.username == username)
    // console.log(user)

    // if ()
    if (user == undefined) {
        return {
            message: `Can't find ${username}`,
            session: undefined
        }
    }
    else if (user.password != password) {
        return {
            message: `Wrong password`,
            session: undefined
        }
    }




    const sessionId = generateRandomString(30, { isUpper: true, isNumber: true })
    const session = {
        "id": sessionId,
        "username": username
    }


    add_sessions(session)
    return {
        message: "OK",
        session: session,
    }
}