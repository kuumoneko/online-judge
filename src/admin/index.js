import React from "react";
export function Admin() {
    const url = document.URL.split("//")[1].split("/");
    return (React.createElement("div", null,
        React.createElement("a", null, url[2] || "Admin Home")));
}
//# sourceMappingURL=index.js.map