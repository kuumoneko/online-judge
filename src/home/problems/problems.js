var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getdata, geturl } from "types";
import React, { useEffect, useState } from "react";
export function Problem() {
    const url = geturl();
    // console.log(url)
    // UI
    const [problems, setproblems] = useState();
    // info
    const [problems_groups, set_problems_groups] = useState([]);
    const [problems_types, set_problems_types] = useState([]);
    useEffect(() => {
        function dataa() {
            return __awaiter(this, void 0, void 0, function* () {
                const types = yield getdata("get", "problem_types", "all");
                const groups = yield getdata("get", "problem_groups", "all");
                set_problems_types(types.data.data.map((value) => {
                    return value.name;
                }));
                set_problems_groups(groups.data.data.map((value) => {
                    return value.name;
                }));
            });
        }
        dataa();
    }, []);
    // input
    const [search, setsearch] = useState("");
    const [group, setgroup] = useState("");
    const [type, settype] = useState("");
    const [point, setpoint] = useState(0);
    useEffect(() => {
    }, []);
    return (React.createElement("div", null,
        React.createElement("div", null),
        React.createElement("div", { className: "problem_search" },
            React.createElement("h3", null,
                "Search:",
                React.createElement(FontAwesomeIcon, { icon: faCircleQuestion, style: { "marginLeft": "10px" } })),
            React.createElement("form", null,
                React.createElement("div", null,
                    React.createElement("input", { type: "text", value: search, onChange: (e) => { setsearch(e.target.value); } })),
                React.createElement("div", null,
                    React.createElement("label", null, "Types:"),
                    React.createElement("select", { name: "type", value: type, onChange: (e) => { settype(e.target.value); } }, problems_types.map((value) => {
                        return (React.createElement("option", { value: value }, value));
                    }))),
                React.createElement("div", null,
                    React.createElement("label", null, "Groups:"),
                    React.createElement("select", { name: "group", value: group, onChange: (e) => { setgroup(e.target.value); } }, problems_groups.map((value) => {
                        return (React.createElement("option", { value: value }, value));
                    }))),
                React.createElement("div", null,
                    React.createElement("input", { type: "range", name: "", id: "", min: 0, max: 1000, value: point, onChange: (e) => { setpoint(Number(e.target.value)); } }))))));
}
//# sourceMappingURL=problems.js.map