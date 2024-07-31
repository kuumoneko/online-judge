import { Problems, User } from "type";
import { sort_problems } from "../problems/problems.ts";
import { sort_users } from "../users/users.ts";
import { sort_comments } from "../general/get.ts";

interface lmao {
    [keys: string]: string[]
}

export function searching(search: any) {

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
    //         "problems", "groups", "ultility/types
    //     ],
    //     "comments": [
    //         "comments"
    //     ],
    //     "contests": [
    //         "contests", "groups", "ultility/types
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