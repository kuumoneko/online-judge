import React from "react";
export function Luythua({ a, b }) {
    if (b == undefined) {
        let cnt = 0;
        while (a % 10 == 0) {
            a /= 10;
            cnt++;
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { style: {
                    position: "relative"
                } }, (a == 1) ? `10` : `${a} x 10`),
            React.createElement("span", { style: {
                    verticalAlign: "5px",
                    fontSize: "10px"
                } }, cnt)));
    }
    else {
        return (React.createElement("div", null,
            React.createElement("a", null, a),
            React.createElement("a", null, b)));
    }
}
//# sourceMappingURL=luythua.js.map