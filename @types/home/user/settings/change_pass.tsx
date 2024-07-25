import { getdata, geturl } from "ultility/ulti.js";
import { color, color_themes } from "ultility/color.js"
import React, { useState, useEffect } from "react"
import Cookies from "js-cookie";

export function ChangePassword() {

    const [old_pass, setold_pass] = useState("");
    const [new_pass, setnew_pass] = useState("");
    const [confirm_pass, setconfirm_pass] = useState("");
    const [submit, setsubmit] = useState(false)
    const theme = color[Cookies.get("theme") as "dark" | "light"]

    const [check_pass, setcheck_pass] = useState(true);
    const [similar, setsimilar] = useState(true)
    // console.log(theme)
    useEffect(() => {
        async function submit_password() {
            if (submit == false) {
                return;
            }
            setsimilar(true)
            // console.log(new_pass, ' ', confirm_pass)
            if (new_pass != confirm_pass) {
                setsimilar(false)
                setsubmit(false)
                return;
            }

            setsimilar(true)
            const res = await getdata("change_password", "", {
                username: geturl()[1],
                old_pass: old_pass,
                new_pass: new_pass
            })

            // console.log(res.data.data)

            if (res.data.data[0].data == "Wrong password") {
                setcheck_pass(false);
                setsubmit(false)
                return;
            }

            if (res.data.data == "OK") {
                window.location.href = `/user/${localStorage.getItem("username") as string}`
            }

            setsubmit(false)
        }

        submit_password();

    }, [submit])


    return (
        <div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                Old password:
                            </th>
                            <th>
                                <input
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.font
                                    }}
                                    type="text"
                                    value={old_pass}
                                    onChange={(e) => {
                                        setold_pass(e.target.value)
                                    }}
                                />
                            </th>
                        </tr>
                        {
                            !check_pass && (
                                <tr>
                                    <th>

                                    </th>
                                    <th>
                                        <span style={{ color: "red" }}>Wrong password</span>
                                    </th>
                                </tr>
                            )
                        }

                        <tr>
                            <th>
                                New password:
                            </th>
                            <th>
                                <input
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.font
                                    }}
                                    type="text"
                                    value={new_pass}
                                    onChange={(e) => {
                                        setnew_pass(e.target.value)
                                    }}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                Comfirm password:
                            </th>
                            <th>
                                <input
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.font
                                    }}
                                    type="text"
                                    value={confirm_pass}
                                    onChange={(e) => {
                                        setconfirm_pass(e.target.value)
                                    }}
                                />
                            </th>
                        </tr>
                        {
                            !similar && (
                                <tr>
                                    <th>

                                    </th>
                                    <th>
                                        <span style={{ color: "red" }}>Comfirm password not match</span>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <div>
                    <div
                        style={{
                            float: "left"
                        }}
                    >
                        <a style={{ cursor: "pointer" }} onClick={(e) => {
                            window.location.href = `/forget_password/${localStorage.getItem("username") as string}/verify`
                        }}>
                            Forget password?
                        </a>
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                            float: "right",
                            width: "65px",
                            border: "1px solid black",
                            borderRadius: "5px",
                            backgroundColor: color_themes,
                            color: theme.font,
                            cursor: "pointer"
                        }}
                        onClick={(e) => {
                            setsubmit(true)
                        }}
                    >
                        <a>
                            Change
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}