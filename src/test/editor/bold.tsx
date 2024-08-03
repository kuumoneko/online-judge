import React from "react"
import { Preview } from "./index.tsx"

export function Bold({ line }: { line: string }) {
    const temp = {
        st: line.slice(0, line.indexOf("**")),
        select: line.slice(line.indexOf("**") + 2, (line.indexOf("***", line.indexOf("**") + 2) != -1) ? line.indexOf("***", line.indexOf("**") + 2) + 1 : line.indexOf("**", line.indexOf("**") + 2)),
        end: line.slice((line.indexOf("***", line.indexOf("**") + 2) != -1) ? line.indexOf("***", line.indexOf("**") + 2) + 3 : line.indexOf("**", line.indexOf("**") + 2) + 2, line.length),
    }
    // console.log(temp)

    return (
        <div style={{
            display: "flex"
        }
        }>
            {
                temp.st
            }
            < strong
                style={
                    {
                        marginLeft: "5px",
                        marginRight: "5px"
                    }
                }
            >
                <Preview str={temp.select} />
            </strong>
            {
                temp.end
            }
        </div>
    )
}