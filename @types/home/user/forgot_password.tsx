
import { geturl } from "ultility/ulti.js";
import React from "react";
import { Verify_password_page } from "./forgot_password/verify.js";
import { Reset_password } from "./forgot_password/change_password.js";



export function ForgotPassword(): React.JSX.Element {
    const url = geturl();

    if (url[2] == "verify") {
        return (
            <Verify_password_page />
        )
    }
    else if (url[2] == "reset_password") {
        return (
            <Reset_password />
        )
    }
    else {
        return (
            <></>
        )
    }
}
