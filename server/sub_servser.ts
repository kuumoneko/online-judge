import { getDataFromDatabase } from "ultility/data.js";
import { User } from "ultility/types.js";


export function get_number_users_of_group(group: string) {
    const users: User[] = getDataFromDatabase("users", "users");

    const numberOfUsers = users.reduce((acc, user) => {
        if (user.group.includes(group)) {
            acc++;
        }
        return acc
    }, 0)

    return numberOfUsers;
}

