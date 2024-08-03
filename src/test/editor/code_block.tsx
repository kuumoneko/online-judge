import { Preview } from "./index.tsx";

export function Code_block({ lines }: { lines: string[] }) {
    const fi = lines.findIndex((line: string) => {
        return line.includes("```")
    })

    let ed = fi + 1;

    for (let i = ed; i < lines.length; i++) {
        if (lines[i].includes("```")) {
            ed = i + 1;
            break;
        }
    }
    return (
        <>
            <Preview str={lines.slice(0, fi).join("\n")} />

            <code lang={`${lines.slice(fi, ed)[0].split("```")[1]}`}
                title={lines.slice(fi, ed).slice(1, lines.slice(fi, ed).length - 1).join("\n")}
                style={{
                    width: "100%",
                    display: "flex",
                    fontSize: "15px",
                    marginLeft: "2px",
                    marginRight: "2px",
                    backgroundColor: "#ccc",
                    padding: "5px 5px 5px 5px",
                    borderRadius: "2px",
                    flexDirection: "column"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        position: "absolute",
                        width: "95%",
                        // right: "1%",
                    }}
                >
                    <div
                        id="copy_button"
                        style={{
                            padding: "2px 2px 2px 2px",
                            border: "1px solid black",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            navigator.clipboard.writeText(lines.slice(fi, ed).slice(1, lines.slice(fi, ed).length - 1).join("\n"))
                            e.currentTarget.innerText = "Copied"
                            setTimeout(() => {
                                const copy_button = document.getElementById("copy_button");
                                if (copy_button) {
                                    copy_button.innerText = "Copy"
                                }
                            }, 1000)
                        }}
                    >
                        Copy
                    </div>
                </div>
                {
                    lines.slice(fi, ed).slice(1, lines.slice(fi, ed).length - 1).map((line: string) => {
                        return (
                            <a
                                style={{
                                    borderLeft: "3px solid #a2a0a7",
                                    padding: "0 0 0 2px",
                                    width: "90%",
                                    cursor: "pointer",
                                    userSelect: "none",
                                    zIndex: "1"
                                }}

                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderLeft = "3px solid #fff"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderLeft = "3px solid #a2a0a7"
                                }}
                            >
                                {
                                    line.length > 0 ? (
                                        line
                                    ) : (
                                        <br />
                                    )
                                }
                            </a>
                        )
                    })
                }
            </code >
            <Preview str={lines.slice(ed, lines.length).join("\n")} />

        </>
    )
}