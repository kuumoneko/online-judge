import React from "react"

export function Luythua({ a }: { a: number }): React.JSX.Element;
export function Luythua({ a, b }: { a: number, b?: number }): React.JSX.Element {

    if (b == undefined) {
        let cnt = 0;
        while (a % 10 == 0) {
            a /= 10;
            cnt++;
        }
        return (
            <>
                <span
                    style={{
                        position: "relative"
                    }}
                >
                    {
                        (a == 1) ? `10` : `${a} x 10`
                    }
                </span>
                <span
                    style={{
                        verticalAlign: "5px",
                        fontSize: "10px"
                    }}
                >
                    {cnt}
                </span>
            </>
        )
    }
    else {
        return (
            <div>
                <a>
                    {a}
                </a>
                <a>
                    {b}
                </a>
            </div>
        )
    }

}