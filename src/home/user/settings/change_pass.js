var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { color, color_themes, getdata, geturl } from "types";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
export function ChangePassword() {
    const [old_pass, setold_pass] = useState("");
    const [new_pass, setnew_pass] = useState("");
    const [confirm_pass, setconfirm_pass] = useState("");
    const [submit, setsubmit] = useState(false);
    const theme = color[Cookies.get("theme")];
    const [check_pass, setcheck_pass] = useState(true);
    const [similar, setsimilar] = useState(true);
    // console.log(theme)
    useEffect(() => {
        function submit_password() {
            return __awaiter(this, void 0, void 0, function* () {
                if (submit == false) {
                    return;
                }
                setsimilar(true);
                // console.log(new_pass, ' ', confirm_pass)
                if (new_pass != confirm_pass) {
                    setsimilar(false);
                    setsubmit(false);
                    return;
                }
                setsimilar(true);
                const res = yield getdata("change_password", "", {
                    username: geturl()[1],
                    old_pass: old_pass,
                    new_pass: new_pass
                });
                // console.log(res.data.data)
                if (res.data.data[0].data == "Wrong password") {
                    setcheck_pass(false);
                    setsubmit(false);
                    return;
                }
                if (res.data.data == "OK") {
                    window.location.href = `/user/${localStorage.getItem("username")}`;
                }
                setsubmit(false);
            });
        }
        submit_password();
    }, [submit]);
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Old password:"),
                        React.createElement("th", null,
                            React.createElement("input", {
                                style: {
                                    backgroundColor: theme.background,
                                    color: theme.font
                                }, type: "text", value: old_pass, onChange: (e) => {
                                    setold_pass(e.target.value);
                                }
                            }))),
                    !check_pass && (React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement("span", { style: { color: "red" } }, "Wrong password")))),
                    React.createElement("tr", null,
                        React.createElement("th", null, "New password:"),
                        React.createElement("th", null,
                            React.createElement("input", {
                                style: {
                                    backgroundColor: theme.background,
                                    color: theme.font
                                }, type: "text", value: new_pass, onChange: (e) => {
                                    setnew_pass(e.target.value);
                                }
                            }))),
                    React.createElement("tr", null,
                        React.createElement("th", null, "Comfirm password:"),
                        React.createElement("th", null,
                            React.createElement("input", {
                                style: {
                                    backgroundColor: theme.background,
                                    color: theme.font
                                }, type: "text", value: confirm_pass, onChange: (e) => {
                                    setconfirm_pass(e.target.value);
                                }
                            }))),
                    !similar && (React.createElement("tr", null,
                        React.createElement("th", null),
                        React.createElement("th", null,
                            React.createElement("span", { style: { color: "red" } }, "Comfirm password not match")))))),
            React.createElement("div", null,
                React.createElement("div", {
                    style: {
                        float: "left"
                    }
                },
                    React.createElement("a", {
                        style: { cursor: "pointer" }, onClick: (e) => {
                            window.location.href = `/forget_password/${localStorage.getItem("username")}/verify`;
                        }
                    }, "Forget password?")),
                React.createElement("div", {
                    style: {
                        textAlign: "center",
                        float: "right",
                        width: "65px",
                        border: "1px solid black",
                        borderRadius: "5px",
                        backgroundColor: color_themes,
                        color: theme.font,
                        cursor: "pointer"
                    }, onClick: (e) => {
                        setsubmit(true);
                    }
                },
                    React.createElement("a", null, "Change"))))));
}
//# sourceMappingURL=change_pass.js.map