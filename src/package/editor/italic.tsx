import { Preview } from "./index.tsx"

export function Italic({ line }: { line: string }) {
    const temp = {
        st: line.slice(0, line.indexOf("*")),
        select: line.slice(line.indexOf("*") + 1, line.indexOf("*", line.indexOf("*") + 1)),
        end: line.slice(line.indexOf("*", line.indexOf("*") + 1) + 1, line.length),
    }
    // console.log(temp)
    return (
        <div style={{
            display: "flex"
        }}>
            {
                temp.st
            }
            <em>
                <Preview str={temp.select} />
            </em>
            {
                temp.end
            }
        </div>
    )
}