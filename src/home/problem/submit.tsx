import {  Editor } from "editor";
import { geturl } from "ulti";
import { getdata } from "ulti"
import { useState, useEffect } from "react"
import { Problems, User } from "type";
import { color } from "color";
import Cookies from "js-cookie";
import { Languages } from "enum";

export function Problem_Submit() {
    const url = geturl();

    const [language, setlang] = useState("");
    const [languages, setlangs] = useState([])
    const [opened, setopen] = useState(false)
    const theme = color[Cookies.get("theme") as "dark" | "light"]
    const [code_lang, setcode_lang] = useState("");
    const [ext, setext] = useState("")
    const [type, settype] = useState("");
    const [usr_id, setusr_id] = useState("")
    const [prlblm_id, setprlblm_id] = useState("")
    let problem: Problems | null = null, user: User | null = null;
    // let temp;

    useEffect(() => {
        async function get_problem() {
            const res = {
                problem: await getdata("get", "problems", url[1]),
                user: await getdata("get", "users", localStorage.getItem("username") as string)
            }

            const problem: Problems = res.problem.data.data[0];
            const user: User = res.user.data.data[0];

            setusr_id(user.username as string)
            setprlblm_id(problem.id)


            // get the languages that both user and problem supported
            const languages = problem.languages.filter((lang: string) => {
                return user.language.languages.includes(lang)
            })
            setlang(problem.languages.find((e) => user.language.default_language == e) ? user.language.default_language : languages[0])

            setlangs(languages as [])
            setcode_lang(language == "" ?
                problem.languages.find((e) => user.language.default_language == e) ? user.language.default_language : languages[0]
                : language)
        }
        get_problem();
    }, [])

    useEffect(() => {
        try {
            setcode_lang(language == "" ?
                (problem as unknown as Problems).languages.find((e) => (user as unknown as User).language.default_language == e) ? (user as unknown as User).language.default_language : languages[0]
                : language)
        }
        catch {

        }
    }, [opened, language])

    // useEffect(() => {
    //     // It will auto format the string and add to div
    //     after_effect(type, "editorr")
    // }, [type])

    // useEffect(() => { console.log("lmao") })

    setInterval(() => {
        // console.log(document.getElementById("editorr")?.innerText)
        settype(document.getElementById("editorr")?.title as string)
    }, 1000)

    useEffect(() => {
        setext(`${code_lang == Languages.JAVA ? ".java" : (code_lang == Languages.PY3) ? ".py" : (code_lang == Languages.JS) ? ".js , .mjs , .cjs" : (code_lang == Languages.TS) ? ".ts" : ".cpp"}`)
    } , [code_lang])

    return (
        <div>
            <div>
                <div>
                    Paste your code here or paste it from your file:
                    <input
                        type="file"
                        accept={ext}
                        style={{ marginLeft: "5px", outline: "none", marginBottom: "5px" }}
                        onInput={async (e) => {
                            // console.log(e.target as HTMLInputElement)
                            if (e.target) {
                                const tempp = (e.target as HTMLInputElement).files?.item(0)?.name
                                if (`.${tempp?.split(".")[1]}` != ext) {
                                    return;
                                }
                                const text = await (e.target as HTMLInputElement).files?.item(0)?.text();
                                // console.log(temp)
                                settype(text as string || type)
                            }
                        }}
                    />
                </div>
                <Editor str={type} anything="submit" />
                <div
                    style={{
                        marginTop: "15px"
                    }}
                >

                    <div>
                        {
                            opened && (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "auto auto auto auto auto",
                                        gridGap: "5px",
                                        marginBottom: "5px",
                                        padding: "5px 5px 5px 5px"

                                    }}
                                >
                                    {
                                        languages.map((user_problem_language: string) => {
                                            return (
                                                <div
                                                    onClick={(e) => {
                                                        // console.log((e.target as HTMLDivElement).id)
                                                        setopen(false);
                                                        setlang((e.target as HTMLDivElement).id)
                                                    }}
                                                    id={user_problem_language}
                                                >
                                                    <a
                                                        id={user_problem_language}
                                                        onClick={(e) => {
                                                            // console.log((e.target as HTMLDivElement).id)
                                                            setopen(false);
                                                            setlang((e.target as HTMLDivElement).id)
                                                        }}
                                                    >
                                                        {user_problem_language}
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                        <div
                            style={{
                                border: `1px solid ${theme.font}`,
                                borderRadius: "5px",
                                padding: "5px 0px 5px 5px"
                            }}
                            onClick={() => {
                                setopen(true)
                            }}
                        >
                            <a
                                onClick={() => {
                                    setopen(true)
                                }}
                            >
                                {
                                    code_lang
                                }
                            </a>
                        </div>


                    </div>

                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        marginTop: "5px"
                    }}
                    onClick={async (e) => {


                        let version = ""
                        if (language == Languages.JAVA) {
                            version = "21.0.3"
                        }
                        else if (language == Languages.JS) {
                            version = "20.16.0"
                        }
                        else if (language == Languages.TS) {
                            version = "5.0.3"
                        }
                        else if (language == Languages.PY3) {
                            version = "3.12.2"
                        }
                        else {
                            version = language.split("C++")[1].split(" ")[0]
                        }

                        const res = await getdata("submit", "", {
                            user: usr_id,
                            problem: prlblm_id,
                            language: language,
                            version: version,
                            code: type
                        })
                        // window.location.href = `/submissions/${res.data.id}`
                    }}
                >
                    <div
                        className="problem-submit"
                        style={{
                            height: "30px",
                            width: "70px",
                            cursor: "pointer"
                        }}
                    >
                        Submit
                    </div>
                </div>
            </div>

        </div>
    )
}