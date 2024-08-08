export interface ProblemsSample {
    input: string,
    output: string
}

export interface Node {
    from: number,
    to: number,
    weight: number
}

export interface ProblemsTask {
    points: number, // in %
    limit: InputLimit[]
}

export interface Comment {
    id: string,
    host: string,
    content: string,
    time: string,
    // id
    reply: string
}

export const InputTypes = [
    "number",
    "string",
    "boolean",
    "array", // choose number , string , boolean
    "any" // kết hợp. VD: 1 2 3, a 1 2, true(1) 2 3
]

export interface InputLimit {
    key: string,
    maxvalue: number,
    minvalue: number
}