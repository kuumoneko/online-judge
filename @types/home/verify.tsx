import React, { useEffect, useState } from "react";
import { getdata, geturl } from "ultility/ulti.js";


async function lmao() {
    const url = geturl();
    const res = await getdata("get", "users", url[1]);
    // console.log(res.data.data[0])
    // setusername(res.username as string)
    // console.log(res)
    await getdata("verify", "", { username: res.data.data[0].username, code: undefined });

    return {
        email: res.data.data[0].email,
        username: res.data.data[0].username,
    }
}

export function Verify_user() {

    let inputStates: any[] = []
    for (let i = 0; i < 6; i++) {
        const [digit, setDigit] = useState("");
        inputStates.push({ digit, setDigit });
    }

    const [email, setemail] = useState("");
    const [submit, setsubmit] = useState(false);
    const [username, setusername] = useState("");
    const [error, seterror] = useState("")

    const [send, setsend] = useState(false)


    // useEffect(() => {
    //     async function bruh() {
    //         const res = await lmao();
    //         setusername(res.username as string);
    //         setemail(res.email)
    //     }
    //     bruh()

    // }, [])

    useEffect(() => {
        async function bruh() {
            const res = await lmao();
            setusername(res.username as string);
            setemail(res.email)
        }
        bruh()

    }, [send])
    // setsend(true)

    useEffect(() => {
        async function lmao() {

            // console.log(inputStates)

            const code = String(inputStates.reduce((data: string, item: any) => {
                // console.log(item)
                return data + String(item.digit)
            }, ""))


            // console.log(code)
            const res = await getdata("verify", "", { username: username, code: code })
            // console.log(res.data)

            if (res.data != "OK") {
                seterror(res.data)
                setsubmit(false)
            }
            window.location.href = "/"
        }
        if (submit == true) {
            lmao()
        }
    }, [submit])

    const handlePaste = (e: any) => {
        e.preventDefault();
        // console.log("bruh")
        const value = e.clipboardData.getData("text")
        Array(value.length).fill(0).map((item, index) => {
            const data = value[index]
            let curr_Input: any = document.getElementById(`codeInput-${index}`);
            inputStates[index].setDigit(Number(data))
            // console.log(curr_Input)
            if (curr_Input !== undefined && curr_Input !== null) {
                (curr_Input as HTMLInputElement).value = data

                curr_Input.focus();
            }

        })
    }

    return (
        <div
            style={
                { display: "flex", flexDirection: "column" }
            }
            onKeyDown={(e) => {
                e.preventDefault();
                const key = e.key;
                const id = Number((e.target as HTMLInputElement).id.split("-")[1]);
                if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"].includes(key) == false) {
                    return;
                }
                else if (key == "Backspace") {
                    inputStates[id].setDigit();

                    let curr_Input: any = document.getElementById(`codeInput-${id}`);
                    if ((curr_Input as HTMLInputElement).value == "") {
                        let prevInput: any = document.getElementById(`codeInput-${id - 1}`);

                        if (prevInput !== undefined && prevInput !== null) {
                            (prevInput as HTMLInputElement).value = ""
                            prevInput.focus();
                        }

                    }
                    else {
                        (curr_Input as HTMLInputElement).value = ""
                        let prevInput: any = document.getElementById(`codeInput-${id - 1}`);
                        if (prevInput !== undefined && prevInput !== null) prevInput.focus();
                    }
                }
                else {
                    inputStates[id].setDigit(Number(key));

                    let curr_Input: any = document.getElementById(`codeInput-${id}`);
                    (curr_Input as HTMLInputElement).value = key

                    let nextInput: any = document.getElementById(`codeInput-${id + 1}`);

                    if (nextInput !== undefined && nextInput !== null) {
                        nextInput.focus();
                    }
                }


            }}
            onPaste={handlePaste}

        >
            <a>
                {`We sent you a verification code via email ${email}`}
            </a>
            <a>
                Enter the verification code in the box below to verify your account
            </a>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                {Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <input
                            key={index}
                            id={`codeInput-${index}`}
                            type="text"
                            maxLength={1}
                            // onPaste={handlePaste}


                            style={{ height: "40px", width: "30px", margin: "10px", color: "black", border: "1px solid", textAlign: "center" }}
                        />
                    ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "red" }}>
                <a>
                    {error}
                </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input type="submit" onClick={(e) => {
                    e.preventDefault();
                    // console.log("Submit")
                    setsubmit(true)
                }}>
                </input>
                <input type="button" value="Resend" onClick={(e) => {
                    e.preventDefault();
                    setsend(true)
                }}>
                </input>
            </div>

        </div>
    )
}