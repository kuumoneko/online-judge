
import { ReactElement } from "react"
import { Coding_status, Languages, Theme_mode, User_role } from "../enum/index.ts";
import { Comment, InputLimit, ProblemsSample, ProblemsTask } from "./subtypes.ts";


export interface User_Submission {
    id: string,
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
    group: string[], // id
    points: number,
    problems_count: number,
    rank: number,
    role: User_role,
    profile: string,
    themes: {
        mode: Theme_mode
    },
    language: {
        languages: string[],
        default_language: Languages
    },
    problems: User_Submission[], // id
    verified: boolean,
    bookmarks: string[] // id
}


export interface Group {
    groupname: ReactElement | string,
    isPublic: boolean,
    id: string,
    description: string
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
    id: string,
    name: string,
    host: string[],
    publishTime: number,

    SubmissionStatus: {
        AC: number,
        WA: number,
        RTE: number,
        IR: number,
        OLE: number,
        MLE: number,
        TLE: number,
        IE: number
    },
    isPublished: {
        nani: boolean,
        error: string
    },
    isPrivate: boolean,
    groups: string[],
    types: string[],
    points: number,
    def_limit: {
        time: number,
        memory: number
    },
    specificLanguage: {},
    languages: Languages[]
    body: {
        topic: string,
        sample: ProblemsSample[],
        inputLimit: InputLimit[],
        subTasks: ProblemsTask[],
        explanation: string[],
        support: {
            nani: boolean,
            body: string
        }
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

export interface Blog {
    id: string,
    name: string,
    host: string,
    body: string,
    publishTime: string,
    isPublished: boolean,
    comments: Comment[]
}


// dataserver

export interface Data_server_output {
    status_mess: string,
    message: string,
    data: User[] | Group[] | Problems[] | ProblemsGroup[] | ProblemsType[] | User_Submission[] | Blog[]
}
