import React from "react";

export function Luy_thua({ a, b }: { a: any, b: any }) {


    return (
        <span>
            <span>
                {a}
            </span>
            <span
                style={{
                    verticalAlign: "5px"
                }}
            >
                {b}
            </span>
        </span>
    )
}