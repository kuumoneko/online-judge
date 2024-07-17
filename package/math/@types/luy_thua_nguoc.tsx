import React from "react";

export function Luy_thua_nguoc({ a, b }: { a: any, b: any }) {


    return (
        <span>
            <span>
                {a}
            </span>
            <span
                style={{
                    verticalAlign: "-5px",
                    fontSize:"10px"
                }}
            >
                {b}
            </span>
        </span>
    )
}