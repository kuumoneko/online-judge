import React, { useState, useEffect } from "react";
const commands = {
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
};
export function Searching({ search }) {
    const [result, setResult] = useState([]);
    useEffect(() => {
        async function lmao() {
            // const res = await getdata("get", "search", search)
        }
        lmao();
    }, []);
    return (React.createElement("div", null));
}
//# sourceMappingURL=searching.js.map