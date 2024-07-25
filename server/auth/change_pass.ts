import { getDataFromDatabase, writeDataToDatabase } from "ultility/data.js";

export function change_password(username: string, old_password: string, new_password: string) {

    interface password_data {
        username: string,
        password: string,
    }
    const user_pass: password_data[] = getDataFromDatabase("users", "passwords");

    const user = user_pass.filter((user) => {
        return user.username == username
    })[0]

    if (user == undefined) {
        return "User not found"
    }
    else if (user.password == old_password) {
        user_pass.splice(user_pass.findIndex((user) => {
            return user.username == username
        }), 1)


        user_pass.push({
            username: username,
            password: new_password
        })

        writeDataToDatabase("users", "passwords", user_pass);

        return "OK"
    }
    else {
        return "Wrong password"
    }
} 