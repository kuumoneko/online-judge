import { geturl } from "ulti";
import { Problem_info } from "./info.tsx";
import { Problem_Submit } from "./submit.tsx";


export function Problem() {
    const url = geturl()
    if (url[2] == undefined) {
        return (
            < Problem_info />
        )

    }
    else if (url[2] == "submit") {
        return (
            <Problem_Submit />
        )
    }
    return (
        <></>
    )
}