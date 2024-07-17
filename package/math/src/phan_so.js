import React from "react";
// @ts-ignore
export function Phanso({ a, b }) {
    const length = Math.max(a.length, b.length);
    return (React.createElement("span", null,
        React.createElement("span", {
            style: {
                borderBottom: ".5px solid",
                position: "absolute",
                textAlign: "center",
                display: "block",
                width: `${length * 8}px`
            }
        }, a),
        React.createElement("span", {
            style: {
                position: "relative",
                top: "19px",
                // alignItems: "center",
                textAlign: "center",
                display: "block",
                width: `${length * 8}px`
            }
        }, b)));
}
//# sourceMappingURL=phan_so.js.map