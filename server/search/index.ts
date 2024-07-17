import { Problems, User } from "types";
import { sort_problems } from "../problems/problems.js";
import { sort_users } from "../users/users.js";
import { sort_comments } from "../general/get.js";

interface lmao {
    [keys: string]: string[]
}

export function searching(search: string) {

    const prio = [
        "users", "problems", "comments", "contests", "submissions", "groups", "blogs",

        "admin", "admin users", "admin problems", "admin problems types", "admin problems groups", "admin comments", "admin contests", "admin submissions", "admin groups", "admin blogs"
    ]


    const search_string = search.split(" ");


    const search_result = {
        "users": sort_users("points", search, true) as User[],
        "problems": sort_problems("points", search, true) as Problems[],
        "comments": [],
        "contests": [],
        "submissions": [],
        "groups": [],
        "blogs": [],
        "admin": [],

        "admin users": [],
        "admin problems": [],
        "admin problems types": [],
        "admin problems groups": [],
        "admin comments": [],
        "admin contests": [],
        "admin submissions": [],
        "admin groups": [],
        "admin blogs": []
    }


    // const commands: lmao = {
    //     "users": [
    //         "users", "groups"
    //     ],
    //     "problems": [
    //         "problems", "groups", "types"
    //     ],
    //     "comments": [
    //         "comments"
    //     ],
    //     "contests": [
    //         "contests", "groups", "types"
    //     ],
    //     "submissions": [
    //         "submissions"
    //     ]
    // }

    // const command = commands[search_string[0].split("/")[1]]

    // let result: any;

    // switch (search_string[0].split("/")[1]) {
    //     case "users":
    //         result = ""
    //         break;
    //     case "problems":
    //         result = ""
    //         break;
    //     case "comments":
    //         result = ""
    //         break;
    //     case "contests":
    //         result = ""
    //         break;
    //     case "submissions":
    //         result = ""
    //         break;
    // }

}