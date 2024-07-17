import React from "react";

export function Logarit({ a, b }: { a: any, b: any }) {


    return (
        <span
            style={{
                display: "flex",
                flexDirection: "row"
            }}>
            <span>
                log
            </span>
            <span
                style={{
                    verticalAlign: "-6px",
                    fontSize: "10px"
                }}
            >
                {a}
            </span>
            <span
            // style={{
            //     verticalAlign: "5px"
            // }}
            >
                {b}
            </span>
        </span>
    )
}