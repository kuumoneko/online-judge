import { getDataFromDatabase } from "data";
import { all_language, generateRandomString } from "ulti";
import { Languages } from "enum";
import { add_users } from "../users/users.ts";
import { add_sessions } from "./auth.ts";

export function signup(username: string, fullname: string, email: string, password: string) {
    const temp: any[] = getDataFromDatabase("users", "users");
    const user = temp.find((item: any) => item.username == username);

    if (user != undefined) {
        throw new Error("Username existed");
    }
    else {
        const temp = {
            fullname: fullname,
            username: username,
            password: password,
            email: email,
            group: [],
            contribute: 0,
            points: 0,
            problems_count: 0,
            rank: 0,
            role: "User",
            language: {
                languages: all_language,
                default_language: Languages.C20,
            },
            themes: {
                color: "#ff9797",
                mode: "light"
            },
            profile: {
                data: "",
                html: "",
            },
            problems: [],
            blogs: [],
            verified: false
        }

        add_users(temp);

        const sessionId = generateRandomString(30);
        const session = {
            "id": sessionId,
            "username": username
        }


        add_sessions(session)

        return {
            message: "OK",
            session: session
        }
    }
}