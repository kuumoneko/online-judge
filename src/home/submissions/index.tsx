import { geturl } from "ulti"
import { Specific_Submissions } from "./submissions.tsx";
import { Submission } from "./id.tsx";

export function Submissions(): JSX.Element {
    const url = geturl();

    if (/^\d+$/.test(url[1]) && url[2] == undefined) {
        return (
            <Submission id={url[1]} />
        )
    }
    else {
        return (
            <Specific_Submissions
                user={url[2] != undefined ? url[2] : "all"}
                problem={url[1] != undefined ? url[1] : "all"}
            />
        )
    }
}