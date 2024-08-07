import {
    faAt,
    faBold,
    faCalculator,
    faCode,
    faItalic,
    faLink,
    faListOl,
    faListUl,
    faQuoteLeft,
    faCircleQuestion,
    faPenToSquare,
    faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Preview } from "./preview.tsx";
import { allowed_html_tags } from "ulti";
// import { Bold } from "./bold.tsx";
// import Cookies from "js-cookie"
// import { getdata } from "ulti"
// import { color, get_rank_color } from "color"
// import { User_role } from "enum"
// import MathJax from "react-mathjax"

// function Luythua({ a, b, c }: { a: any, b: any, c: any }) {
//     return (
//         <MathJax.Provider>
//             <MathJax.Node formula={(a == 0) ? `{${b}}^{${c}}` : `{${a}}.{${b}}^{${c}}`} />
//         </MathJax.Provider>
//     )
// }

// function Luythuanguoc({ a, b }: { a: any, b: any }) {
//     return (
//         <MathJax.Provider>
//             <MathJax.Node formula={`{${a}}_{${b}}`} />
//         </MathJax.Provider>
//     )
// }

// function Phanso({ a, b }: { a: any, b: any }) {
//     return (
//         <MathJax.Provider>
//             <MathJax.Node formula={`\\frac{${a}}{${b}}`} />
//         </MathJax.Provider>
//     )
// }

// function Bacham() {
//     return (
//         <MathJax.Provider>
//             <MathJax.Node formula="\\cdots" />
//         </MathJax.Provider>
//     )
// }

// function Can({ a, b }: { a: any, b: any }) {

//     return (
//         <MathJax.Provider>
//             <MathJax.Node formula={(a == 2) ? `\\sqrt{${b}}` : `\\sqrt[${a}]{${b}}`} />
//         </MathJax.Provider>
//     )
// }

// function Logarit({ a, b }: { a: any, b: any }) {
//     return (
//         <MathJax.Provider>
//             <MathJax.Node formula={`\\log_{${a}}{${b}}`} />
//         </MathJax.Provider>
//     )
// }

// function Abs({ a }: { a: any }) {
//     return (
//         <MathJax.Provider>
//             <MathJax.Node formula={`|${a}|`} />
//         </MathJax.Provider>
//     )
// }

function LineSelection(str: string, selectedString: string) {
    const lines = str.split("\n");

    const findLineNumbers = () => {
        const startIndex = str.indexOf(selectedString);
        const endIndex = startIndex + selectedString.length;

        let startLine = 0;
        let endLine = lines.length - 1;

        let currentCharIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + 1; // Account for newline character
            if (currentCharIndex + lineLength > startIndex) {
                startLine = i;
                break;
            }
            currentCharIndex += lineLength;
        }

        currentCharIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + 1; // Account for newline character
            if (currentCharIndex + lineLength > endIndex) {
                endLine = i;
                break;
            }
            currentCharIndex += lineLength;
        }

        return { startLine, endLine };
    };

    const { startLine, endLine } = findLineNumbers();

    return {
        startLine,
        endLine,
    };
}
export function after_effect(str: string[]): void;
export function after_effect(str: string): void;
export function after_effect(str: string | string[]): void {
    let temp: string[];
    if (typeof str == "string") {
        temp = str.split("\n");
    } else {
        temp = str;
    }

    // console.log(temp)

    const editor = document.getElementById("editorr");
    if (editor) {
        editor.innerHTML = temp
            .map((item) => {
                let dataa = "";
                // allowed_html_tags.forEach((tag) => {
                //     // console.log(item, ' ', item.includes("<") || item.includes(">"))
                //     if (item.includes(`<${tag}`) || item.includes(`</${tag}`)) {
                //         let finding_first_tag = item.indexOf(">", item.indexOf(`<${tag}`));
                //         let finding_second_tag = item.indexOf(
                //             ">",
                //             item.indexOf(`</${tag}`)
                //         );

                //         let tempp_first_tag = item.substring(
                //             item.indexOf(`<${tag}`),
                //             finding_first_tag + 1
                //         );
                //         let tempp_second_tag = item.substring(
                //             item.indexOf(`</${tag}`),
                //             finding_second_tag + 1
                //         );

                //         dataa = item
                //             .replaceAll(
                //                 tempp_first_tag,
                //                 tempp_first_tag.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
                //             )
                //             .replaceAll(
                //                 tempp_second_tag,
                //                 tempp_second_tag.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
                //             );
                //     }
                // });
                // console.log(item, ' ', item.includes("<"), ' ', item.includes(">"))
                if (item.includes("<") || item.includes(">")) {
                    dataa = item.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
                }

                return dataa == "" ? ((/^\s*$/.test(item) || item == "") ? "<br>" : item) : dataa;
            })
            .filter((item) => {
                // console.log(item)
                return item != ""
            })
            .map((item) => {
                return `<div> <span> ${item}</span> </div>`;
            })
            .join("\n");
    }
}

export function Editor({ str = "", anything = "editor" }: { str?: string, anything?: string }): JSX.Element {
    const [cursor, setcursor] = useState("");
    const [cursor_col, setcol] = useState(0);
    const [select, setselect] = useState("");
    const [type, settype] = useState(str);
    const [temp_line, settemp_line] = useState(0);
    const [mode, setmode] = useState("editor");
    const [paste_string, set_paste_string] = useState("")

    useEffect(() => {
        after_effect(str);
    }, [])

    const OnClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (mode != "editor") {
            return;
        }
        const id = e.currentTarget.id;
        if (["-list", "1list", "quote"].includes(id)) {
            let startLine, endLine;
            if (select != "") {
                const temp = LineSelection(type, select);
                startLine = temp.startLine;
                endLine = temp.endLine;
            } else {
                // startLine = endLine = LineSelection(type, cursor).startLine;

                if (cursor != null) {
                    startLine = endLine = LineSelection(type, cursor).startLine;
                } else {
                    startLine = endLine = temp_line;
                }
            }

            const temp = type.split("\n");
            for (let i = startLine; i <= endLine; i++) {
                // console.log(temp[i].startsWith("- "))
                if (temp[i].startsWith("> ") || temp[i].startsWith("- ")) {
                    temp[i] = temp[i].slice(2, temp[i].length);
                } else if (temp[i].startsWith("1. ")) {
                    temp[i] = temp[i].slice(3, temp[i].length);
                }

                const adding = id == "-list" ? "- " : id == "1list" ? "1. " : "> ";
                temp[i] = adding + temp[i];
            }

            const res = temp.join("\n");

            const contenteditableDiv = document.getElementById("editorr");
            if (contenteditableDiv) {
                contenteditableDiv.innerText = res;
                settype(res);
            }
        } else if (["bold", "italic", "underline", "user", "math", "link"].includes(id)) {
            if (select != "") {
                if (id == "user") {
                    return;
                }

                const temp = LineSelection(type, select);
                const startLine = temp.startLine;
                const endLine = temp.endLine;

                // console.log(select.split("\n"))
                const tempp: string[] = type.split("\n");

                const adding: string = id == "bold" ? "**" : id == "italic" ? "*" : "~";

                const select_after_split: string[] = select.split("\n");

                if (select_after_split.length > 1) {
                    // get str at the first line
                    const start = type
                        .split("\n")
                    [
                        startLine
                    ].slice(type.split("\n")[startLine].indexOf(select_after_split[0]), type.length);
                    // get str at the last line
                    const end = type
                        .split("\n")
                    [
                        endLine
                    ].slice(0, type.split("\n")[endLine].indexOf(select_after_split[select_after_split.length - 1]) + select_after_split[select_after_split.length - 1].length);

                    tempp[startLine] =
                        type
                            .split("\n")
                        [
                            startLine
                        ].slice(0, tempp[startLine].indexOf(select_after_split[0])) +
                        adding +
                        start +
                        adding;

                    tempp[endLine] =
                        adding +
                        end +
                        adding +
                        type
                            .split("\n")
                        [
                            endLine
                        ].slice(type.split("\n")[endLine].indexOf(select_after_split[select_after_split.length - 1]) + select_after_split[select_after_split.length - 1].length);

                    for (let i = startLine + 1; i <= endLine - 1; i++) {
                        if (tempp[i] != "") {
                            tempp[i] = adding + tempp[i] + adding;
                        }
                    }

                    after_effect(tempp);
                    settype(tempp.join("\n"));
                } else {
                    tempp[startLine] = tempp[startLine]
                        .split(select)
                        .join(adding + select + adding);

                    after_effect(tempp);
                    settype(tempp.join("\n"));
                }
                // console.log(tempp)
            } else {
                let line;
                if (cursor != null) {
                    line = LineSelection(type, cursor).startLine;
                } else {
                    line = temp_line;
                }
                // console.log(line)
                const temp = type.split("\n");

                const str = type.split("\n")[line];

                const adding =
                    id == "bold"
                        ? "**text here**"
                        : id == "italic"
                            ? "*text here*"
                            : id == "user"
                                ? "@{username here}"
                                : (id == "link") ? "[description here](link here)" : "~math formula here~";

                temp[line] =
                    str.length > 0
                        ? str.slice(0, cursor_col) +
                        adding +
                        str.slice(cursor_col, str.length)
                        : adding;

                const res = temp.join("\n");

                settype(res);
                after_effect(temp);
            }
        } else if (id == "code") {
        }
    };

    const getcursorposition = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        // get cursor position in what Node
        let cursor_position = window.getSelection()?.getRangeAt(0)
            .commonAncestorContainer as Node;
        while (cursor_position?.parentElement?.id == "") {
            cursor_position = cursor_position?.parentNode as Node;
        }
        // get the nearest child of parent
        let last_parent_Node = cursor_position;
        // get the parent
        cursor_position = cursor_position?.parentNode as Node;

        // find number of #text to get line, cnt will be line number
        let cnt = 0;
        cursor_position.childNodes.forEach((e, index) => {
            if (
                ((e as HTMLElement).innerText != undefined) &&
                index <
                Array.prototype.indexOf.call(
                    cursor_position.childNodes,
                    last_parent_Node
                )
            ) {
                cnt++;
            }
        });
        // set the cursor line
        settemp_line(cnt);
        setcol(window.getSelection()?.getRangeAt(0).startOffset as number);
        setcursor(
            window.getSelection()?.getRangeAt(0).commonAncestorContainer
                .nodeValue as string
        );
        setselect(window.getSelection()?.toString() as string);
    };

    return (
        <div>
            {
                anything == "editor" && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            height: "15px",
                            width: "500px",
                            marginBottom: "10px",
                        }}
                    >
                        {/* 
                            Editor
                        */}
                        <a
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setmode("editor");
                            }}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <a
                                style={{
                                    padding: "0 0 0 0",
                                    marginLeft: "2px"
                                }}>
                                Editor
                            </a>
                        </a>
                        {/* 
                            Preview
                        */}
                        <a
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setmode("preview");
                            }}
                        >
                            <FontAwesomeIcon icon={faEye} />
                            <a
                                style={{
                                    padding: "0 0 0 0",
                                    marginLeft: "2px"
                                }}>
                                Preview
                            </a>
                        </a>
                        {/*
                            **
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faBold}
                            id="bold"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/*
                            *
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faItalic}
                            id="italic"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/* 
                            -
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faListUl}
                            id="-list"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/* 
                            1.
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faListOl}
                            id="1list"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/* 
                            ```

                            ```         
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faCode}
                            id="code"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/* 
                            > quote
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faQuoteLeft}
                            id="quote"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/* 
                            [link](description)
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faLink}
                            id="link"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/* 
                            @{username}
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faAt}
                            id="user"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/* 
                            ~math~
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}

                            icon={faCalculator}
                            id="math"
                            onClick={(e) => {
                                OnClick(e);
                            }}
                        />
                        {/* 
                            help
                        */}
                        <FontAwesomeIcon
                            style={{
                                opacity: (mode == "editor") ? "1" : "0",
                                transition: "all 1s ease-in-out"
                            }}
                            icon={faCircleQuestion} />

                    </div>
                )
            }


            <div
                style={{
                    height: anything == "editor" ? "350px" : "800px",
                    width: "1500px",
                    display: "flex",
                    // flexDirection: "row",
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                    borderRight: "1px solid",
                    borderLeft: "1px solid",
                    borderRadius: "25px",
                }}
            >
                {
                    anything == "editor" ?
                        (
                            <div
                                className="editprofile-flipcard"
                            >
                                <div
                                    className={`editprofile-flip${mode == "editor" ? "" : " flipped"}`}
                                >
                                    <div
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                        }}
                                        className="profile-editor"
                                    >
                                        <div
                                            id="editorr"
                                            spellCheck="false"
                                            contentEditable="true"
                                            title={type}
                                            onInput={(e) => {
                                                settype(e.currentTarget.innerText.replaceAll(/\n\n/g, "\n"));
                                                setcursor(
                                                    window.getSelection()?.getRangeAt(0).commonAncestorContainer
                                                        .nodeValue as string
                                                );
                                                getcursorposition(e as any);

                                                if (paste_string != "") {
                                                    after_effect(
                                                        e.currentTarget.innerText.replaceAll(/\n\n/g, "\n")
                                                    );
                                                    try {
                                                        let temp = Array.from(e.currentTarget.childNodes)
                                                        let last_string = paste_string.split("\n")[paste_string.split("\n").length - 1]

                                                        const temping = (
                                                            temp
                                                                .filter((e) => e.nodeName != "#text")
                                                                .map((e, index) => { return { index: index, node: e } })
                                                                .filter((e) => (e.node as HTMLElement).innerText.includes(last_string))[0]
                                                                .node as HTMLElement
                                                        ).innerText
                                                            .indexOf(last_string) + last_string.length + 1
                                                        const ode = temp
                                                            .filter((e) => e.nodeName != "#text")
                                                            .map((e, index) => { return { index: index, node: e } })
                                                            .filter((e) => (e.node as HTMLElement).innerText.includes(last_string))[0]
                                                            .node
                                                            .childNodes[1]
                                                            .childNodes[0]


                                                        const range = document.createRange();
                                                        const sel = window.getSelection();
                                                        range.setStart(ode, temping)
                                                        sel?.removeAllRanges();
                                                        sel?.addRange(range);
                                                    }
                                                    catch (e: any) {
                                                        console.error(e.message)
                                                    }

                                                    set_paste_string("")
                                                }
                                            }}
                                            onPaste={(e) => {
                                                // setpaste(true)
                                                set_paste_string(e.clipboardData.getData("text"))
                                            }}
                                            onMouseUp={(e) => {
                                                getcursorposition(e);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key == "Enter") {
                                                    getcursorposition(e);
                                                }
                                            }}
                                        ></div>
                                    </div>

                                    <div
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                        }}
                                        className="profile-preview"
                                    >
                                        <div
                                            style={{
                                                height: "90%",
                                                width: "100%",
                                                padding: "15px 15px 15px 15px",
                                                overflow: "hidden scroll",
                                            }}
                                        >
                                            <Preview str={type} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <>
                                <div
                                    style={{
                                        height: "750px",
                                        width: "1500px",
                                    }}
                                    className="profile-editor"
                                >
                                    <div
                                        style={{
                                            height: "100%"
                                        }}
                                        id="editorr"
                                        spellCheck="false"
                                        contentEditable="true"
                                        title={type}
                                        onInput={(e) => {
                                            settype(e.currentTarget.innerText.replaceAll(/\n\n/g, "\n"));
                                            setcursor(
                                                window.getSelection()?.getRangeAt(0).commonAncestorContainer
                                                    .nodeValue as string
                                            );
                                            getcursorposition(e as any);

                                            if (paste_string != "") {
                                                after_effect(
                                                    e.currentTarget.innerText.replaceAll(/\n\n/g, "\n")
                                                );
                                                try {
                                                    let temp = Array.from(e.currentTarget.childNodes)
                                                    let last_string = paste_string.split("\n")[paste_string.split("\n").length - 1]

                                                    const temping = (
                                                        temp
                                                            .filter((e) => e.nodeName != "#text")
                                                            .map((e, index) => { return { index: index, node: e } })
                                                            .filter((e) => (e.node as HTMLElement).innerText.includes(last_string))[0]
                                                            .node as HTMLElement
                                                    ).innerText
                                                        .indexOf(last_string) + last_string.length + 1
                                                    const ode = temp
                                                        .filter((e) => e.nodeName != "#text")
                                                        .map((e, index) => { return { index: index, node: e } })
                                                        .filter((e) => (e.node as HTMLElement).innerText.includes(last_string))[0]
                                                        .node
                                                        .childNodes[1]
                                                        .childNodes[0]


                                                    const range = document.createRange();
                                                    const sel = window.getSelection();
                                                    range.setStart(ode, temping)
                                                    sel?.removeAllRanges();
                                                    sel?.addRange(range);
                                                }
                                                catch (e: any) {
                                                    console.error(e.message)
                                                }

                                                set_paste_string("")
                                            }
                                        }}
                                        onPaste={(e) => {
                                            // setpaste(true)
                                            set_paste_string(e.clipboardData.getData("text"))
                                        }}
                                        onMouseUp={(e) => {
                                            getcursorposition(e);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key == "Enter") {
                                                getcursorposition(e);
                                            }
                                        }}
                                    />
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    );
}
