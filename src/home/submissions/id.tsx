import { useEffect } from "react";
import { getdata } from "ulti";

export function Submission({ id }: { id: string }): JSX.Element {

    useEffect(() => {
        async function get_submission() {
            const res = await getdata("get", "submissions", id);
            console.log(res.data)
        }
        get_submission();
    }, [])

    return (
        <>
        </>
    )
}