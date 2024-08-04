import { Bold } from "./bold.tsx";
import { Italic } from "./italic.tsx";
import { Single_code } from "./single_code.tsx";
import { Heading } from "./heading.tsx";
import { Lists } from "./lists.tsx";
import { Code_block } from "./code_block.tsx";
import { Username } from "./username.tsx";
import { Math } from "./math.tsx";
import { Link } from "./link.tsx";
import Cookies from "js-cookie"

function sanitizeHtml(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');

    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => (script.parentNode as HTMLElement).removeChild(script));

    return doc.body.innerHTML;
}

export function Preview({ str }: { str: string[] }): JSX.Element;
export function Preview({ str }: { str: string }): JSX.Element;
export function Preview({ str }: { str: string | string[] }): JSX.Element {
    let lines: string[];
    if (typeof str == "string") {
        lines = str.split("\n");
    }
    else {
        lines = str;
    }

    // if some lines have "```"
    if (
        lines
            .filter((line: string) => {
                return line.startsWith("```")
            })
            .length > 0
    ) {
        return (
            <Code_block lines={lines} />
        )
    }
    // if some lines have "1. " or "- " or "> "
    else if (
        lines
            .filter((line: string) => {
                return line.startsWith("1. ") || line.startsWith("- ") || line.startsWith("> ")
            })
            .length > 0
    ) {
        return (
            <Lists lines={lines} />
        )
    }
    // console.log(lines)
    // else
    return (
        <div>
            {
                lines.map((line: string) => {
                    // console.log("lmaoodjfhbdjhvbgfdj ", ' ', line)
                    // Heading
                    if (line.startsWith("#")) {
                        return (
                            <Heading line={line} />
                        )
                    }
                    // Bold
                    else if (line.includes("**")) {
                        return (
                            <Bold line={line} />
                        )
                    }
                    // Italic
                    else if (line.includes("*")) {
                        return (
                            <Italic line={line} />
                        )
                    }
                    // Code
                    else if (line.includes("`")) {
                        return (
                            <Single_code line={line} />
                        )
                    }
                    else if (line.includes("~") && line.includes("~", line.indexOf("~") + 1)) {
                        return (
                            <Math line={line} />
                        )
                    }
                    // metion user
                    else if (line.includes("@{") && line.includes("}", line.indexOf("@{") + 1)) {
                        return (
                            <Username line={line} />
                        )
                    }
                    else if (line.includes("------")) {
                        return (
                            <div
                                style={{
                                    borderBottom: "1px solid",
                                    borderColor: Cookies.get("theme") == "dark" ? "white" : "black",
                                    width: "100%"
                                }}
                            >
                            </div>
                        )
                    }
                    else if (line.includes("](") && line.includes(")", line.indexOf("](") + 1) && line.includes("[")) {
                        return (
                            <Link line={line} />
                        )
                    }
                    // nothing
                    else if (line == "") {
                        return (
                            <br />
                        )
                    }
                    // html tag
                    else if (
                        line.startsWith("<")
                    ) {
                        return (
                            <div
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(line.replaceAll("\\\"", "\"")) }}
                            >

                            </div>
                        )
                    }

                    // string only
                    return (
                        <div>
                            <a
                                style={{
                                    padding: "0 0 0 0"
                                }}
                            >
                                {line}
                            </a>
                        </div>
                    )
                })
            }
        </div>
    )
}