var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect } from "react";
const commands = {
    "users": [
        "users", "groups"
    ],
    "problems": [
        "problems", "groups", "types"
    ],
    "comments": [
        "comments"
    ],
    "contests": [
        "contests", "groups", "types"
    ],
    "submissions": [
        "submissions"
    ]
};
export function Searching({ search }) {
    const [result, setResult] = useState([]);
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                // const res = await getdata("get", "search", search)
            });
        }
        lmao();
    }, []);
    return (React.createElement("div", null));
}
//# sourceMappingURL=searching.js.map