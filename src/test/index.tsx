import { faAt, faBold, faCalculator, faCode, faItalic, faLink, faListOl, faListUl, faQuoteLeft, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react"
// import MathJax from "react-mathjax";
import { Preview } from "./editor/index.tsx";
import { allowed_html_tags } from "ulti";


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
    const lines = str.split('\n');

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
    }

}
function after_effect(str: string[]): void;
function after_effect(str: string): void;
function after_effect(str: string | string[]): void {
    let temp: string[];
    if (typeof str == "string") {
        temp = str.split("\n");
    }
    else {
        temp = str;
    }

    // console.log(temp)

    const editor = document.getElementById("editorr");
    if (editor) {
        editor.innerHTML = temp.map((item) => {
            let dataa = ""
            allowed_html_tags.forEach((tag) => {
                if (item.includes(`<${tag}`)) {
                    let finding_first_tag = item.indexOf(">", item.indexOf(`<${tag}`));
                    let finding_second_tag = item.indexOf(">", item.indexOf(`</${tag}`));

                    let tempp_first_tag = item.substring(item.indexOf(`<${tag}`), finding_first_tag + 1);
                    let tempp_second_tag = item.substring(item.indexOf(`</${tag}`), finding_second_tag + 1);

                    dataa = item.replace(tempp_first_tag, tempp_first_tag.replace("<", "&lt;").replace(">", "&gt;")).replace(tempp_second_tag, tempp_second_tag.replace("<", "&lt;").replace(">", "&gt;"))
                }
            })

            return dataa == "" ? ((item == "") ? "<br>" : item) : dataa;
        }).map((item) => {
            return `<div> <span> ${item}</span> </div>`;
        }).join("\n")
    }
}

export function Test() {

    // const code = `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\ncout << "hello world";\nreturn 0;\n}`;
    // const code_block = "```"
    // const str = `${code_block}cpp\n${code}\n${code_block}\n\n# testing`;

    // const temp = (
    //     <Preview str={"<h1 align=\"center\"> Hi 👋, I'm Kuumo Nzeko </h1>\n<h2 align=\"center\"> learning in Vietnam </h2>\n\n---------\n\n<br />\n<a href=\"https://discord.com/users/950354453033263175\" target=\"_blank\" align=\"center\">\n<img align=\"center\"  src=\"https://discord.c99.nl/widget/theme-1/950354453033263175.png\"/>\n</a>\n<br />\n\n\n- 🌱 I’m currently learning **javascript**\n\n- Building a React server: **[Online Judge using React.js](https://github.com/kuumoneko/online-judge)**\n\n- My Github: **[Kuumoneko](https://github.com/kuumoneko)**"} />
    // )

    // console.log(temp)
    // console.log(renderToStaticMarkup(temp).replaceAll("&lt;", "<").replaceAll("&gt;", ">"))
    return (
        <Preview str={"lmao @{kuumoneko} lmaoo"} />
    )
}


// Preview({
//     str: "1. kjdgfbnkjdgfnb\n1. fgkbjfngbkfgjbn\n1. fglkbjnfgbklj\n\nfgkljbnfgkbjf\n\nfglbjnfgbk"
// })


export function Testt() {
    const [cursor, setcursor] = useState("");
    const [cursor_col, setcol] = useState(0);
    const [select, setselect] = useState("");
    const [type, settype] = useState("");
    const [temp_line, settemp_line] = useState(0);
    const [mode, setmode] = useState("editor");

    const OnClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {

        const id = e.currentTarget.id;
        if (["-list", "1list", "quote"].includes(id)) {


            let startLine, endLine;
            if (select != "") {
                const temp = LineSelection(type, select)
                startLine = temp.startLine;
                endLine = temp.endLine;
            }
            else {
                // startLine = endLine = LineSelection(type, cursor).startLine;

                if (cursor != null) {
                    startLine = endLine = LineSelection(type, cursor).startLine;
                }
                else {
                    startLine = endLine = temp_line
                }
            }

            const temp = type.split('\n');
            for (let i = startLine; i <= endLine; i++) {
                // console.log(temp[i].startsWith("- "))
                if (temp[i].startsWith("> ") || temp[i].startsWith("- ")) {
                    temp[i] = temp[i].slice(2, temp[i].length)
                }
                else if (temp[i].startsWith("1. ")) {
                    temp[i] = temp[i].slice(3, temp[i].length)
                }

                const adding = (id == "-list") ? "- " : (id == "1list") ? "1. " : "> ";
                temp[i] = adding + temp[i];
            }

            const res = temp.join("\n");

            const contenteditableDiv = document.getElementById("editorr");
            if (contenteditableDiv) {
                contenteditableDiv.innerText = res;
                settype(res)
            }
        }
        else if (["bold", "italic", "underline", "user", "math"].includes(id)) {
            if (select != "") {
                if (id == "user") {
                    return;
                }

                const temp = LineSelection(type, select)
                const startLine = temp.startLine;
                const endLine = temp.endLine;

                // console.log(select.split("\n"))
                const tempp: string[] = type.split("\n")

                const adding: string = (id == "bold") ? "**" : (id == "italic") ? "*" : "~"

                const select_after_split: string[] = select.split("\n");

                if (select_after_split.length > 1) {
                    // get str at the first line
                    const start = type
                        .split("\n")[startLine]
                        .slice(type.split("\n")[startLine]
                            .indexOf(select_after_split[0]), type.length)
                    // get str at the last line
                    const end = type
                        .split("\n")[endLine]
                        .slice(0, type
                            .split("\n")[endLine]
                            .indexOf(select_after_split[select_after_split.length - 1]) + select_after_split[select_after_split.length - 1].length)

                    tempp[startLine] = type
                        .split("\n")[startLine]
                        .slice(0, tempp[startLine]
                            .indexOf(select_after_split[0]))
                        + adding + start + adding


                    tempp[endLine] =
                        adding + end + adding + type
                            .split("\n")[endLine]
                            .slice(type
                                .split("\n")[endLine]
                                .indexOf(select_after_split[select_after_split.length - 1]) + select_after_split[select_after_split.length - 1].length)


                    for (let i = startLine + 1; i <= endLine - 1; i++) {
                        if (tempp[i] != "") {
                            tempp[i] = adding + tempp[i] + adding
                        }
                    }

                    after_effect(tempp)
                    settype(tempp.join("\n"))
                }
                else {
                    tempp[startLine] = tempp[startLine].split(select).join(adding + select + adding)

                    after_effect(tempp)
                    settype(tempp.join("\n"))
                }
                // console.log(tempp)
            }
            else {
                let line;
                if (cursor != null) {
                    line = LineSelection(type, cursor).startLine;
                }
                else {
                    line = temp_line
                }

                const temp = type.split("\n");

                const str = type.split("\n")[line];

                const adding = (id == "bold") ? "**text here**" : (id == "italic") ? "*text here*" : (id == "user") ? "@{username here}" : "~math formula here~"

                temp[line] = (str.length > 0) ? str.slice(0, cursor_col) + adding + str.slice(cursor_col, str.length) : adding;

                const res = temp.join("\n")

                settype(res);
                after_effect(temp);
            }
        }
        else if (id == "code") {

        }
    }


    const getcursorposition = (e: any) => {
        // get cursor position in what Node
        let cursor_position = window.getSelection()?.getRangeAt(0).commonAncestorContainer as Node
        while (cursor_position?.parentElement?.id == "") {
            cursor_position = cursor_position?.parentNode as Node
        }
        // get the nearest child of parent
        let last_parent_Node = cursor_position
        // get the parent
        cursor_position = cursor_position?.parentNode as Node

        // find number of #text to get line, cnt will be line number
        let cnt = -1;
        cursor_position.childNodes.forEach((e, index) => {
            if (e.nodeName == "#text" && index < Array.prototype.indexOf.call(cursor_position.childNodes, last_parent_Node)) {
                cnt++;
            }
        })
        // set the cursor line
        settemp_line(cnt)
        setcol(window.getSelection()?.getRangeAt(0).startOffset as number)
        setcursor(window.getSelection()?.getRangeAt(0).commonAncestorContainer.nodeValue as string)
        setselect(window.getSelection()?.toString() as string)
    }

    return (
        <div>
            <a>
                Test
            </a>
            <div
                style={
                    {
                        display: "flex",
                        justifyContent: "space-around",
                        height: "15px",
                        width: "500px",
                        marginBottom: "10px"
                    }
                }
            >

                {/* 
                    Editor
                */}

                <a style={{
                    cursor: "pointer",
                }}

                    onClick={() => {
                        setmode("editor")
                    }}
                >
                    Editor
                </a>
                {/* 
                    Preview
                */}
                <a style={{
                    cursor: "pointer",
                }}

                    onClick={() => {
                        setmode("preview")
                    }}
                >
                    Preview
                </a>
                {/* 
                    **
                */}
                <FontAwesomeIcon icon={faBold} id="bold"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    *
                */}
                <FontAwesomeIcon icon={faItalic} id="italic"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    -
                */}
                <FontAwesomeIcon icon={faListUl} id="-list"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    number .
                */}
                <FontAwesomeIcon icon={faListOl} id="1list"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    ```

            ```
                */}
                <FontAwesomeIcon icon={faCode} id="code"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    > quote
                */}
                <FontAwesomeIcon icon={faQuoteLeft} id="quote"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    ![link](description)
                */}
                <FontAwesomeIcon icon={faLink} id="link"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    @{username}
                */}
                <FontAwesomeIcon icon={faAt} id="user"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    ~math~
                */}
                <FontAwesomeIcon icon={faCalculator} id="math"
                    onClick={(e) => {
                        OnClick(e)
                    }}
                />
                {/* 
                    help
                */}
                <FontAwesomeIcon icon={faCircleQuestion} />
            </div>

            <div style={{
                height: "350px",
                width: "1500px",
                display: "flex",
                // flexDirection: "row",
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderRight: "1px solid",
                borderLeft: "1px solid",
                borderRadius: "25px",
            }}>

                <div
                    style={{
                        height: "100%",
                        width: "100%"
                    }} className="editprofile-flipcard">
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                        }} className={`editprofile-flip${mode == "editor" ? "" : " flipped"}`}>
                        <div
                            style={{
                                height: "100%",
                                width: "100%"
                            }}
                            className="profile-editor"
                        >
                            <div
                                id="editorr"
                                spellCheck="false"
                                contentEditable="true"
                                title={type}
                                onInput={(e) => {
                                    e.preventDefault()
                                    settype(e.currentTarget.innerText.replaceAll(/\n\n/g, '\n'))
                                    setcursor(window.getSelection()?.getRangeAt(0).commonAncestorContainer.nodeValue as string);
                                }}
                                onPaste={(e) => {
                                    e.preventDefault();
                                    settype(e.clipboardData.getData("text").split("\r").join(""))

                                    after_effect(e.clipboardData.getData("text").split("\r").join("").split("\n"));
                                    setcursor(window.getSelection()?.getRangeAt(0).commonAncestorContainer.nodeValue as string);
                                }}
                                onMouseUp={(e) => {
                                    getcursorposition(e)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        getcursorposition(e)
                                    }
                                }}
                            >
                            </div>
                        </div>

                        <div
                            style={{
                                height: "100%",
                                width: "100%"
                            }} className="profile-preview">
                            <div
                                style={{
                                    height: "90%",
                                    width: "100%",
                                    padding: "15px 15px 15px 15px",
                                    overflow: "hidden scroll"
                                }}>
                                {/* <Markdown
                                    children={sanitizeHtml(type)}
                                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                /> */}
                                <Preview str={type} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}