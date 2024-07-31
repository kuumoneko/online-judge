
import { getDataFromDatabase } from "data";

export function me(sessionId: string) {
    const temp: any[] = getDataFromDatabase("auth", "login")
    const user = temp.find((item: any) => item.id == sessionId);

    if (user != undefined) {
        return {
            data: {
                username: user.username
            }
        }
    }
    else {
        return {
            data: {
                username: undefined
            }
        }
    }
}