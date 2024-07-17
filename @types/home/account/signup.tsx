import { faSignature, faUser, faEnvelope, faKey, faEye, faEyeSlash, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useEffect } from "react"
import { color, getdata } from "types"
import Cookies from 'js-cookie';

export function Singup() {

    // fullname , username , email, password, confirm_password 
    const [data, setdata] = useState(["", "", "", "", ""])

    const [UI, setUI] = useState(["", ""])
    const [check_data, setcheck_data] = useState([true, true, true, true, true])
    // const [check_data, setcheck_data] = useState([true])

    const [seeing, setsee] = useState([false, false])


    const [remember, Setremember] = useState(true);

    const theme = color[Cookies.get("theme") as string]

    useEffect(() => {
        let temp1 = "", temp2 = "";
        if (data[3].length > 0) {
            temp1 = (!seeing[0]) ? Array(data[3].length).fill("-").reduce((item: string, str: string) => str + item) : data[3]
        }
        else {
            temp1 = ""
        }

        if (data[4].length > 0) {
            temp2 = (!seeing[1]) ? Array(data[4].length).fill("-").reduce((item: string, str: string) => str + item) : data[4]
        }
        else {
            temp2 = ""
        }


        setUI([
            temp1, temp2
        ])
    }, [seeing])

    // Function to handle form submission
    const hanldeSubmitForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent the default form submission behavior


        const checkingg = [
            (data[0] == "") ? false : true,
            (data[1] == "") ? false : true,
            ((data[2] as string).includes(".") && (data[2] as string).includes("@")),
            ((data[3] as string).length >= 8) ? true : false,
            (data[4] == data[3]) ? true : false
        ];

        setcheck_data(checkingg)
        // console.log(check_data)
        // console.log(check)
        // console.log(true)
        // console.log(((data[2] as string).includes("."), ' ', (data[2] as string).includes("@")))
        // console.log((data[3] as string).length)
        // console.log(data[4])
        // console.log(checkingg[0] == checkingg[1] == checkingg[2] == checkingg[3] == checkingg[4] == true)
        if (checkingg[0] == checkingg[1] == checkingg[2] == checkingg[3] == checkingg[4] == true) {
            const res = await getdata("signup", "", { fullname: data[0], username: data[1], email: data[2], password: data[3] })

            // console.log(res);

            if ((res.data.data as string) == "Username existed") {
                setcheck_data([check_data[0], false, check_data[2], check_data[3], check_data[4]])
            }
            else {
                // console.log("Ok")
                Cookies.set("remember", (remember) ? "true" : "false", { expires: 28 });
                // localStorage.setItem("user", JSON.stringify({ username: username, role: "User" }))
                window.location.href = "/";
            }
        }
    };
    // console.log(data[5])
    return (
        <>
            <div className="container" style={{ display: "block", position: "relative" }}>
                <form className='loginform' onChange={(e) => {
                    // e.preventDefault();
                    const name = (e.target as HTMLInputElement).name;
                    const value = (e.target as HTMLInputElement).value;

                    if (name == "rmb" || (e.target as HTMLInputElement).id == "rmb") {
                        Setremember(!remember);
                        // (document.getElementsByName("rmb")[0] as HTMLInputElement).checked = remember;
                        return;
                    }
                    else {
                        let temp = data;

                        const temping = ["fname", "uname", "mail", "psw", "pswa"];

                        if (name == "psw") {
                            if (value.length < temp[3].length) {
                                temp[3] = temp[3].substring(0, value.length)
                            }
                            else {
                                temp[3] = temp[3] + value[value.length - 1]
                            }
                        }
                        else if (name == "pswa") {

                            if (value.length < temp[4].length) {
                                temp[4] = temp[4].substring(0, value.length)
                            }
                            else {
                                temp[4] = temp[4] + value[value.length - 1]
                            }
                        }
                        else {
                            temp[temping.findIndex((item: string) => (item == name))] = value;
                        }

                        if (name == "psw" || name == "pswa") {
                            // console.log(psw_ref)
                            // if (name == "psw") {
                            //     const temp = pre_psw;
                            //     console.log(temp, ' ', value)
                            // }
                            // if (name == "pswa"){
                            //     const temp = 
                            // }
                            // console.log(value)
                            // console.log((name == "psw") ? (psw_ref.current as unknown as HTMLInputElement).value : (pswa_ref.current as unknown as HTMLInputElement).value)
                            // console.log(pswa_ref.current)

                            // if (name == "psw"){
                            //     set_pre_psw(value)
                            // }
                            // if (name == "pswa"){
                            //     set_pre_pswa(value)
                            // }

                            let temp1 = "", temp2 = "";
                            if (temp[3].length > 0) {
                                temp1 = (!seeing[0]) ? Array(temp[3].length).fill("-").reduce((item: string, str: string) => str + item) : temp[3]
                            }
                            else {
                                temp1 = ""
                            }

                            if (temp[4].length > 0) {
                                temp2 = (!seeing[1]) ? Array(temp[4].length).fill("-").reduce((item: string, str: string) => str + item) : temp[4]
                            }
                            else {
                                temp2 = ""
                            }


                            setUI([
                                temp1, temp2
                            ])
                        }

                        setdata(temp);
                    }
                }}>
                    {/* <a style={{ display: "flex", justifyContent: "space-around" }}>
                        Signup
                    </a> */}
                    <table>
                        {/* Input field for the full name */}
                        <tr>
                            <th style={{ width: "5%" }}>
                                <FontAwesomeIcon icon={faSignature} style={{ display: "flex", }} />
                            </th>
                            <th style={{ width: "90%" }}>
                                <input
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.font
                                    }}
                                    className="fullname"
                                    type="text"
                                    placeholder="Enter Fullname"
                                    name="fname"
                                    required />

                                {/* </input> */}
                            </th>
                            <th style={{ width: "5%" }}>

                            </th>
                        </tr>
                        <tr>
                            <th />
                            <th>
                                {
                                    !check_data[0] && (
                                        <div>
                                            <span>
                                                <a style={{ WebkitTextFillColor: "red" }}>
                                                    Fullname must be at least 1 character
                                                </a>
                                            </span>
                                        </div>

                                    )
                                }
                            </th>

                        </tr>

                        {/* Input field for the username */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faUser} />
                            </th>
                            <th>
                                <input
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.font
                                    }}
                                    className="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    name="uname"
                                    required />
                            </th>

                        </tr>
                        <tr>
                            <th />
                            <th>
                                {
                                    !check_data[1] && (
                                        <div>
                                            <span>
                                                <a style={{ WebkitTextFillColor: "red" }}>
                                                    {
                                                        (data[0] == "") ? "Username must be at least 1 character" : (((data[0] as string).includes(" ")) ? "Username must not have space" : "This username already exists")
                                                        // (username != "") ? "This username already exists" : "Username must be at least 1 character"
                                                    }

                                                </a>
                                            </span>
                                        </div>

                                    )
                                }
                            </th>

                        </tr>

                        {/* Input field for the email */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </th>
                            <th>
                                <input
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.font
                                    }}
                                    className="email"
                                    type="text"
                                    placeholder="Enter Email"
                                    name="mail"
                                    required
                                />
                            </th>

                        </tr>

                        <tr>
                            <th>

                            </th>
                            <th>
                                {
                                    !check_data[2] && (
                                        <div>
                                            <span>
                                                <a style={{ WebkitTextFillColor: "red" }}>
                                                    invalid email
                                                </a>

                                            </span>
                                        </div>
                                    )
                                }
                            </th>
                        </tr>

                        {/* Input field for the password */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faKey} />
                            </th>
                            <th >
                                <input
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.font
                                    }}
                                    className="password"
                                    type="text"
                                    placeholder="Enter password"
                                    name="psw"
                                    required
                                    value={UI[0]}
                                // ref={psw_ref}
                                // style={{ width: "95%", float: "left" }}
                                />



                            </th>
                            <th>
                                <FontAwesomeIcon icon={(seeing[0] ? faEye : faEyeSlash)} onClick={(e) => {
                                    e.preventDefault();
                                    setsee([!seeing[0], seeing[1]])
                                }} />
                            </th>
                        </tr>
                        <tr>
                            <th />
                            <th>
                                {
                                    !check_data[3] && (
                                        <div>
                                            <span>
                                                <a style={{ WebkitTextFillColor: "red" }}>
                                                    Password must be at least 8 characters
                                                </a>
                                            </span>
                                        </div>

                                    )
                                }
                            </th>

                        </tr>

                        {/* Input field for the password again */}
                        <tr>
                            <th>
                                <FontAwesomeIcon icon={faCheck} />
                            </th>
                            <th>
                                <input
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.font
                                    }}
                                    className="apassword"
                                    type="text"
                                    placeholder="Enter Password again"
                                    name="pswa"
                                    required
                                    value={UI[1]}
                                // ref={pswa_ref}
                                />
                            </th>
                            <th>
                                <FontAwesomeIcon icon={(seeing[1] ? faEye : faEyeSlash)} onClick={(e) => {
                                    e.preventDefault();
                                    setsee([seeing[0], !seeing[1]])
                                }} />
                            </th>
                        </tr>
                        <tr>
                            <th />
                            <th>
                                {
                                    !check_data[4] && (
                                        <div>
                                            <span>
                                                <a style={{ WebkitTextFillColor: "red" }}>
                                                    Comfirm password must be similar to password
                                                </a>
                                            </span>
                                        </div>

                                    )
                                }
                            </th>

                        </tr>

                    </table>
                    <hr id='stm' />
                    <hr id='more' />
                    <label style={{ display: "block", float: "left" }}>
                        <input type="checkbox" name="rmb" checked={remember} />
                        <a id="rmb" >
                            remember me
                        </a>
                    </label>
                    <button type="submit" className='submit' onClick={hanldeSubmitForm} style={{ float: "inline-end" }}>
                        <a>
                            Sign up
                        </a>
                    </button>
                </form>
            </div >

        </>
    )
}