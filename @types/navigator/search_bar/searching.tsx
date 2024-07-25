import React, { useState, useEffect } from "react"

interface lmao {
    [keys: string]: string[]
}

const commands: lmao = {
    "users": [
        "users", "groups"
    ],
    "problems": [
        "problems", "groups", "ultility/types.js"
    ],
    "comments": [
        "comments"
    ],
    "contests": [
        "contests", "groups", "ultility/types.js"
    ],
    "submissions": [
        "submissions"
    ]
}

export function Searching({ search }: { search: string }) {

    const [result, setResult] = useState([])

    useEffect(() => {

        async function lmao() {
            // const res = await getdata("get", "search", search)
        }
        lmao();
    }, [])

    return (
        <div>


        </div>
    )
}