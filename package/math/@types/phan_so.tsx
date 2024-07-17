import React from "react";

export function Phanso({ a, b }: { a: any, b: any }) {


    const length = Math.max(a.length, b.length);


    return (
        <span>
            <span
                style={{
                    borderBottom: ".5px solid",
                    position: "absolute",
                    textAlign: "center",
                    display: "block",
                    width: `${length * 8}px`
                }}>
                {
                    a
                }
            </span>
            <span style={{
                position: "relative",
                top: "19px",
                // alignItems: "center",
                textAlign: "center",
                display: "block",
                width: `${length * 8}px`

            }}>
                {
                    b
                }
            </span >
        </span >
    )
}