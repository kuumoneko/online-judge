import { useEffect, useState } from "react";
import { getdata } from "ulti";

export function Specific_Submissions(
    { user, problem }:
        { user: string, problem: string }
): JSX.Element {

    const [UI, setUI] = useState(<></>);
    const [status, setstatus] = useState("");

    async function get_submission() {
        const res = await getdata("get", "submissions", `${problem}-${user}`);
        console.log(res.data.data)

        setUI(
            <div>
                {
                    res.data.data.map((sub: any) => {
                        return (
                            <div>
                                <div>
                                    <a>
                                        
                                    </a>
                                </div>
                                <div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    useEffect(() => {
        get_submission();
    }, [])

    setInterval(() => {
        get_submission();
    }, 5000);

    return (
        <></>
    )
}