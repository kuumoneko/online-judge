import React from "react";

// @ts-ignore
export function Logarit({ a, b }) {
    return (React.createElement("span", { style: {
            display: "flex",
            flexDirection: "row"
        } },
        React.createElement("span", null, "log"),
        React.createElement("span", { style: {
                verticalAlign: "-6px",
                fontSize: "10px"
            } }, a),
        React.createElement("span", null, b)));
}
//# sourceMappingURL=logarit.js.map