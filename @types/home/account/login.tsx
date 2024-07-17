import { faUser, faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { color, getdata } from "types";

export function Login() {
    // information
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');
    const [remember, Setremember] = useState(true)

    const [seeing, setsee] = useState(false)
    const [UI, setUI] = useState("")

    const [submit, setsubmit] = useState(false)

    // [username , password]
    const [error, seterror] = useState([false, false])

    const theme = color[Cookies.get("theme") as string];




    useEffect(() => {
        let temp1 = "";
        if (password.length > 0) {
            temp1 = (!seeing) ? Array(password.length).fill("-").reduce((item: string, str: string) => str + item) : password
        }
        else {
            temp1 = ""
        }
        setUI(temp1)
    }, [seeing])


    useEffect(() => {
        async function lmao() {
            const res = await getdata("login", "users", { username: username, password: password });
            // console.log(res)
            if (res.status == 200) {
                seterror([false, false]);
                Cookies.set("remember", (remember) ? "true" : "false", { expires: 30 });
                window.location.href = "/";
            }
            else if (res.data.data == "Wrong password") {
                seterror([false, true])
            }
            else if (res.data.data.includes("Can't")) {
                seterror([true, false])
            }
            setsubmit(false)

        };

        if (submit == true) {
            lmao();
        }
    }, [submit])

    return (
        <div className="container" style={{ display: "block", paddingTop: "5%" }}>
            <form className='loginform' onChange={(e) => {
                const name = (e.target as HTMLInputElement).name;
                const value = (e.target as HTMLInputElement).value;

                if (name == "uname") {
                    Setusername(value);
                }
                else if (name == "psw") {
                    let temp = password

                    // console.log(value, ' ', temp)

                    if (value.length < temp.length) {
                        temp = temp.substring(0, value.length)
                    }
                    else {
                        temp = temp + value[value.length - 1]
                    }

                    let temp1 = "";
                    if (temp.length > 0) {
                        temp1 = (!seeing) ? Array(temp.length).fill("-").reduce((item: string, str: string) => str + item) : temp
                    }
                    else {
                        temp1 = ""
                    }



                    // set_pre_psw(password)
                    // console.log(temp1)

                    Setpassword(temp);
                    setUI(temp1)

                }
                else if (name == "rmb") {
                    Setremember((e.target as HTMLInputElement).checked)
                }
            }}>
                <table style={{ display: "table" }}>
                    <tbody>
                        <tr>
                            <th style={{ paddingRight: "5px" }}>
                                <FontAwesomeIcon icon={faUser} />
                            </th>
                            <th>
                                <input
                                    style={{ width: "200px", backgroundColor: theme.background, color: theme.font }}
                                    className="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    name="uname"
                                    value={username} // Bind the value of the input field to the state
                                    // onChange={handleUsernameChange} // Handle changes in the input field
                                    required
                                />
                            </th>
                        </tr>

                        {
                            error[0] && (
                                <tr>
                                    <th>

                                    </th>
                                    <th>
                                        <a> Username doesn't matched</a>
                                    </th>

                                </tr>
                            )
                        }

                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faKey} />
                            </th>
                            <th>
                                <input
                                    style={{ width: "200px", backgroundColor: theme.background, color: theme.font }}
                                    className="password"
                                    type="text"
                                    placeholder="Enter Password"
                                    name="psw"
                                    value={UI} // Bind the value of the input field to the state
                                    // onChange={handlePasswordChange} // Handle changes in the input field
                                    required
                                />

                            </th>
                            <th>
                                <FontAwesomeIcon icon={(seeing ? faEye : faEyeSlash)} onClick={(e) => {
                                    e.preventDefault();
                                    setsee(!seeing)
                                }} />
                            </th>
                        </tr>
                        {
                            error[1] && (
                                <tr>
                                    <th>

                                    </th>
                                    <th>
                                        <a> Wrong password</a>
                                    </th>

                                </tr>
                            )
                        }


                    </tbody>
                </table>

                {/* Button to submit the form */}
                <hr id="stm" />
                <hr id="more" />
                <div
                    style={
                        {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }
                    }
                >
                    <div
                        style={
                            {
                                display: "flex",
                                flexDirection: "column"
                            }
                        }

                    >
                        <label style={{ display: "block", float: "left" }}>
                            <input type="checkbox" name="rmb" checked={remember} />
                            <a id="rmb">
                                remember me
                            </a>

                        </label>
                        <a style={{ cursor: "pointer" }} onClick={(e) => {
                            window.location.href = `/forget_password/${username}/verify`
                        }}>
                            Forget password?
                        </a>
                    </div>



                    <button type="submit" className='submit' onClick={(e) => { e.preventDefault(); setsubmit(true) }} style={{ float: "inline-end" }}>
                        <a>
                            Sign in
                        </a>
                    </button>
                </div>


            </form>
        </div>

    );
}