import { geturl } from "ulti";
import React from "react"
import { Problem_info } from "./info.tsx";;


export function Problem() {
    const url = geturl()
    if (url[2] == undefined) {
        return (
            < Problem_info />
        )

    }
    return (
        <></>
    )
}