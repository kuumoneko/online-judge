// @ts-nocheck
import React from "react";
export function Can({ a, b }) {
    const length = Math.max(a.length, b.length);
    return (React.createElement("span", null,
        React.createElement("svg", {
            width: `${13 + b.length * 7.5}px`, height: "1.08em", viewBox: "0 0 400000 1080", preserveAspectRatio: "xMinYMin slice", style: {
                position: "absolute"
            }
        },
            React.createElement("path", { d: "M95,702\r\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\r\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\r\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\r\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\r\nc69,-144,104.5,-217.7,106.5,-221\r\nl0 -0\r\nc5.3,-9.3,12,-14,20,-14\r\nH400000v40H845.2724\r\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\r\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\r\nM834 80h400000v40h-400000z" })),
        React.createElement("a", { style: { paddingLeft: "15px", paddingRight: "15px" } },
            " ",
            b,
            " ")));
}
//# sourceMappingURL=can.js.map