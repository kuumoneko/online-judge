import { Preview } from "./index.tsx";
export function Heading({ line }: { line: string }) {
    const length = line.slice(0, line.indexOf(" ")).length;
    return (
        <a style={
            {
                padding: "0 0 0 0",
                fontSize: (length < 7) ? (20 - length * 1.5) : 10
            }
        }>
            {
                (length < 7) ?
                    line.slice(line.indexOf(" ") + 1, line.length) :
                    line
            }
        </a>
    )
}