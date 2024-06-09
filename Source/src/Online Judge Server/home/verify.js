var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from "react";
import { getdata } from "online-judge-types";
function lmao(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield getdata("get", "users", url[2]);
        yield getdata("verify", "", { username: res.username, code: undefined });
        return {
            email: res.email,
            username: res.username,
        };
    });
}
export function Verify_user({ url }) {
    let inputStates = [];
    for (let i = 0; i < 6; i++) {
        const [digit, setDigit] = useState("");
        inputStates.push({ digit, setDigit });
    }
    const [email, setemail] = useState("");
    const [submit, setsubmit] = useState(false);
    const [username, setusername] = useState("");
    const [error, seterror] = useState("");
    const [send, setsend] = useState(false);
    useEffect(() => {
        function bruh() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield lmao(url);
                setusername(res.username);
                setemail(res.email);
            });
        }
        bruh();
    }, []);
    useEffect(() => {
        function bruh() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield lmao(url);
                setusername(res.username);
                setemail(res.email);
            });
        }
        bruh();
    }, [send]);
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                const code = String(inputStates.reduce((data, item) => {
                    return data + String(item.digit);
                }, ""));
                const res = yield getdata("verify", "", { username: username, code: code });
                if (res.data != "OK") {
                    seterror(res.data);
                    setsubmit(false);
                }
                window.location.href = "/";
            });
        }
        if (submit == true) {
            lmao();
        }
    }, [submit]);
    const handlePaste = (e) => {
        e.preventDefault();
        const value = e.clipboardData.getData("text");
        Array(value.length).fill(0).map((item, index) => {
            const data = value[index];
            let curr_Input = document.getElementById(`codeInput-${index}`);
            inputStates[index].setDigit(Number(data));
            if (curr_Input !== undefined && curr_Input !== null) {
                curr_Input.value = data;
                curr_Input.focus();
            }
        });
    };
    return (React.createElement("div", { style: { display: "flex", flexDirection: "column" }, onKeyDown: (e) => {
            e.preventDefault();
            const key = e.key;
            const id = Number(e.target.id.split("-")[1]);
            if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"].includes(key) == false) {
                return;
            }
            else if (key == "Backspace") {
                inputStates[id].setDigit();
                let curr_Input = document.getElementById(`codeInput-${id}`);
                if (curr_Input.value == "") {
                    let prevInput = document.getElementById(`codeInput-${id - 1}`);
                    if (prevInput !== undefined && prevInput !== null) {
                        prevInput.value = "";
                        prevInput.focus();
                    }
                }
                else {
                    curr_Input.value = "";
                    let prevInput = document.getElementById(`codeInput-${id - 1}`);
                    if (prevInput !== undefined && prevInput !== null)
                        prevInput.focus();
                }
            }
            else {
                inputStates[id].setDigit(Number(key));
                let curr_Input = document.getElementById(`codeInput-${id}`);
                curr_Input.value = key;
                let nextInput = document.getElementById(`codeInput-${id + 1}`);
                if (nextInput !== undefined && nextInput !== null) {
                    nextInput.focus();
                }
            }
        }, onPaste: handlePaste },
        React.createElement("a", null, `We sent you a verification code via email ${email}`),
        React.createElement("a", null, "Enter the verification code in the box below to verify your account"),
        React.createElement("div", { style: { display: "flex", flexDirection: "row", justifyContent: "space-evenly" } }, Array(6)
            .fill(0)
            .map((_, index) => (React.createElement("input", { key: index, id: `codeInput-${index}`, type: "text", maxLength: 1, style: { height: "40px", width: "30px", margin: "10px", color: "black" } })))),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", color: "red" } },
            React.createElement("a", null, error)),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
            React.createElement("input", { type: "submit", onClick: (e) => {
                    e.preventDefault();
                    setsubmit(true);
                } }),
            React.createElement("input", { type: "button", value: "Resend", onClick: (e) => {
                    e.preventDefault();
                    setsend(true);
                } }))));
}
//# sourceMappingURL=verify.js.map