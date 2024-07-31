import { faAt, faBold, faCode, faI, faItalic, faLink, faListOl, faListUl, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import MathJax from "react-mathjax";


function Luythua({ a, b, c }: { a: any, b: any, c: any }) {
    return (
        <MathJax.Provider>
            <MathJax.Node formula={(a == 0) ? `{${b}}^{${c}}` : `{${a}}.{${b}}^{${c}}`} />
        </MathJax.Provider>
    )
}

function Luythuanguoc({ a, b }: { a: any, b: any }) {
    return (
        <MathJax.Provider>
            <MathJax.Node formula={`{${a}}_{${b}}`} />
        </MathJax.Provider>
    )
}

function Phanso({ a, b }: { a: any, b: any }) {
    return (
        <MathJax.Provider>
            <MathJax.Node formula={`\\frac{${a}}{${b}}`} />
        </MathJax.Provider>
    )
}

function Bacham() {
    return (
        <MathJax.Provider>
            <MathJax.Node formula="\\cdots" />
        </MathJax.Provider>
    )
}

function Can({ a, b }: { a: any, b: any }) {

    return (
        <MathJax.Provider>
            <MathJax.Node formula={(a == 2) ? `\\sqrt{${b}}` : `\\sqrt[${a}]{${b}}`} />
        </MathJax.Provider>
    )
}

function Logarit({ a, b }: { a: any, b: any }) {
    return (
        <MathJax.Provider>
            <MathJax.Node formula={`\\log_{${a}}{${b}}`} />
        </MathJax.Provider>
    )
}

function Abs({ a }: { a: any }) {
    return (
        <MathJax.Provider>
            <MathJax.Node formula={`|${a}|`} />
        </MathJax.Provider>
    )

}

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

export function Test() {

    const [start_select, setstart] = useState(0);
    const [end_select, setend] = useState(0);
    const [select, setselect] = useState("")
    const [type, settype] = useState("");


    // setInterval(() => {
    //     console.log(document.getSelection())
    // })

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
                        width: "500px"
                    }
                }
                onClick={(e) => {
                    console.log(start_select, ' ', end_select)

                    console.log(LineSelection(type, select))
                }}
            >
                <FontAwesomeIcon icon={faBold} />
                <FontAwesomeIcon icon={faItalic} />
                <FontAwesomeIcon icon={faI} />
                <FontAwesomeIcon icon={faListUl} />
                <FontAwesomeIcon icon={faListOl} />
                <FontAwesomeIcon icon={faCode} />
                <FontAwesomeIcon icon={faQuoteLeft} />
                <FontAwesomeIcon icon={faLink} />
                <FontAwesomeIcon icon={faAt} />
            </div>
            <div
                style={{
                    height: "300px",
                    width: "1500px",
                    border: "1px solid black"
                }}
                contentEditable
                onInput={(e) => {
                    e.preventDefault()

                    settype(e.currentTarget.innerText)
                }}
                onDoubleClick={(e) => {
                    // console.log(window.getSelection()?.anchorOffset, ' ', window.getSelection()?.focusOffset)
                }}
                onMouseUp={(e) => {
                    console.log(window.getSelection()?.toString())
                    setselect(window.getSelection()?.toString() as string)
                    setstart(window.getSelection()?.anchorOffset as number)
                    setend(window.getSelection()?.focusOffset as number)
                }}
            >

            </div>
        </div>
    )
}