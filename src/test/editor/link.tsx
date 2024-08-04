import { Preview } from "./index.tsx"
export function Link({ line }: { line: string }) {
    const fi_desc = line.split("").map((str: string, index: number) => {
        return {
            index: index,
            str: str
        }
    }).filter((str: { index: number, str: string }) => {
        return str.str == "["
    }).reduce((
        acc: number, cum: { index: number, str: string }
    ) => {
        if (cum.index < line.indexOf("](") && cum.str == "[") {
            return cum.index
        }
        else {
            return acc
        }
    }, 0)

    const temp = {
        fi: line.slice(0, fi_desc),
        desc: line.slice(fi_desc + 1, line.indexOf("](")),
        link: line.slice(line.indexOf("](") + 2, line.indexOf(")", line.indexOf("](") + 1)),
        ed: line.slice(line.indexOf(")", line.indexOf("](") + 1) + 1, line.length)
    }

    return (
        <div
            style={{
                display: "flex"
            }}
        >
            {/* {
                temp.fi != "" && (
                    <Preview str={temp.fi} />
                )
            } */}
            <Preview str={temp.fi} />
            <a href={temp.link}
                target="blank"
                style={
                    {
                        padding: "0 0 0 0"
                    }
                }

            >
                {
                    temp.desc
                }
            </a>
            <Preview str={temp.ed} />
            {/* {
                temp.ed != "" && (
                    <Preview str={temp.ed} />
                )
            } */}
        </div>
    )
}