
import { ReactElement } from "react"
import { Coding_status, Languages, Theme_mode, User_role } from "./enum.js"

// export interface Color {
//     font: string,
//     background: string,
//     content: string
// }

export interface User_Problems {
    user: string,
    time: string,
    status: Coding_status,
    code: string,
    language: Languages
}

export interface User {
    fullname: ReactElement | string,
    username: ReactElement | string,
    password: string,
    email: string,
    group: string[],
    points: number,
    problems_count: number,
    rank: number,
    role: User_role,
    profile: {
        data: string,
        html: string
    },
    themes: {
        mode: Theme_mode
    },
    language: {
        languages: string[],
        default_language: Languages
    },
    problems: []
}


export interface Group {
    groupname: ReactElement | string,
    unt: number
}

export interface Blogs {
    host: string,
    title: string,
    publish_time: string,
    content: string,
    html: string,
    id: string
}

export interface Groups_Mode {

    ctb: string,
    unt: string,
    // mode: string
}

export interface Users_Mode {
    rank: string,
    prlcnt: string,
    pnt: string,
}

export interface Problems {

    host: string[],
    pushlish_time: string,
    public: boolean,
    id: string,

    title: string,
    data: string,
    html: string,


    points: number,
    time_limit: number,
    memory: number,
    input: string,
    output: string,
    hint: {
        nani: boolean,
        data: string,
        html: string
    }

    src: string,
    type: string,
    supported_language: string[],
}