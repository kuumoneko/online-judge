import { Preview } from "./preview.tsx";

export function Single_code({ line }: { line: string }) {
    const fi = line.indexOf("`");
    const ed = line.indexOf("`", fi + 1);
    if (ed == -1) {
        return (
            <>
                {line}
            </>
        )
    }
    // console.log(line.slice(0, fi), ' ', line.slice(fi + 1, ed), ' ', line.slice(ed + 1, line.length))
    return (
        <p
            style={{
                display: "flex"
            }}
        >
            <Preview str={line.slice(0, fi)} />
            <code
                style={{
                    fontSize: "15px",
                    marginLeft: "2px",
                    marginRight: "2px",
                    backgroundColor: "#ccc",
                    borderRadius: "2px"
                }}
            >
                <Preview str={line.slice(fi + 1, ed)} />
            </code>
            <Preview str={line.slice(ed + 1, line.length)} />

        </p>
    )
}