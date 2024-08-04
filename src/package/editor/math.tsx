import { Preview } from "./preview.tsx"
import MathJax from "react-mathjax"
import { useEffect } from "react"

export function Math({ line }: { line: string }) {
    // console.log(line.slice(line.indexOf("~") + 1, line.indexOf("~", line.indexOf("~") + 1)))
    const temp = {
        st: line.slice(0, line.indexOf("~")),
        select: line.slice(line.indexOf("~") + 1, line.indexOf("~", line.indexOf("~") + 1)),
        end: line.slice(line.indexOf("~", line.indexOf("~") + 1) + 1, line.length),
    }

    useEffect(() => {
        const temp = document.getElementsByClassName("MJXc-display")
        if (temp[0]) {
            (temp[0] as HTMLElement).style.margin = "0 0";
            (temp[0] as HTMLElement).style.padding = "0 5px";
        }
    })

    return (
        <div style={{
            display: "flex"
        }}>
            <Preview str={temp.st} />
            <MathJax.Provider>
                <MathJax.Node formula={temp.select} />
            </MathJax.Provider>

            <Preview str={temp.end} />
        </div>
    )
}