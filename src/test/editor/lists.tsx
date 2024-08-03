import { Preview } from "./index.tsx";
export function Lists({ lines }: { lines: string[] }) {
    const selected_list_first_line = lines.findIndex((line) => {
        return line.startsWith("1. ") || line.startsWith("- ") || line.startsWith("> ")
    })
    let selected_list_end_line = selected_list_first_line;
    for (let i = selected_list_first_line + 1; i < lines.length; i++) {
        if (lines[i].startsWith("1. ") || lines[i].startsWith("- ") || lines[i].startsWith("> ")) {
            selected_list_end_line = i;
        }
        else {
            break;
        }
    }

    if (
        selected_list_end_line - selected_list_first_line == 0
    ) {
        return (
            <>
                <Preview str={lines.slice(0, selected_list_first_line).join("\n")} />
                <li
                    style={{
                        display: "flex"
                    }}
                >
                    {
                        ["> "].find((lii: string) => {
                            return lines[selected_list_first_line].startsWith(lii)
                        }) == undefined ? (
                            <a
                                style={{
                                    marginRight: "5px",
                                    padding: "0 0 0 0"
                                }}>

                                {
                                    ["1. ", "- "].find((lii: string) => {
                                        return lines[selected_list_first_line].startsWith(lii)
                                    }) + " "
                                }
                            </a>
                        ) : (
                            <div
                                style={{
                                    marginRight: "5px",
                                    padding: "0 0 0 0",
                                    backgroundColor: "grey",
                                    height: "19px",
                                    width: "5px"
                                }}
                            >

                            </div>
                        )
                    }
                    <Preview str={lines[selected_list_first_line].slice(lines[selected_list_first_line].indexOf(" ") + 1, lines[selected_list_first_line].length)} />
                </li>
                <Preview str={lines.slice(selected_list_first_line + 1, lines.length).join("\n")} />
            </>
        )
    }
    return (
        <>
            <Preview str={lines.slice(0, selected_list_first_line).join("\n")} />
            <ul>
                {
                    lines.slice(selected_list_first_line, selected_list_end_line + 1).map((line, index) => {

                        return (
                            <li
                                style={{
                                    display: "flex"
                                }}
                            >
                                {
                                    ["> "].find((lii: string) => {
                                        return line.startsWith(lii)
                                    }) == undefined ? (
                                        <a
                                            style={{
                                                marginRight: "5px",
                                                padding: "0 0 0 0"
                                            }}>

                                            {
                                                ["1. ", "- "].find((lii: string) => {
                                                    return line.startsWith(lii)
                                                }) + " "
                                            }
                                        </a>
                                    ) : (
                                        <div
                                            style={{
                                                marginRight: "5px",
                                                padding: "0 0 0 0",
                                                backgroundColor: "grey",
                                                height: "19px",
                                                width: "5px"
                                            }}
                                        >

                                        </div>
                                    )
                                }
                                <Preview str={line.slice(line.indexOf(" ") + 1, line.length)} />
                            </li>
                        )
                    })
                }
            </ul>

            <Preview str={lines.slice(selected_list_end_line + 1, lines.length).join("\n")} />
        </>
    )
}