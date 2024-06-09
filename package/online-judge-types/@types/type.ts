
import { ReactElement } from "react"
import { Coding_status, Languages, Theme_mode, User_role } from "./enum.js"


export interface User_Submission {
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
    problems: [],
    verified: boolean
}


export interface Group {
    groupname: ReactElement | string,
    unt: number
}

export interface Blog {
    host: string,
    title: string,
    publish_time: string,
    content: string,
    html: string,
    id: string
}

export interface GroupsMode {

    ctb: string,
    unt: string,
}

export interface UsersMode {
    rank: string,
    prlcnt: string,
    pnt: string,
}

export interface Problems {

    host: string[],
    publish_time: string,
    isPublished: boolean,
    isPrivate: boolean,
    groups: string[],
    name: string,

    title: string,
    data: string


    points: number,
    hint: {
        nani: boolean,
        data: string
    }

    source: string,
    type: string[],
    limit: {},
    def_limit: {
        time: number,
        memory: number
    }
}

export interface ProblemsType {
    host: string,
    name: string,
    id: string,
    description: string,
}

export interface ProblemsGroup {
    host: string,
    name: string,
    id: string,
    description: string,
}