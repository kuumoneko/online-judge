
import { geturl } from "types";
import React from "react";
import { Verify_password_page } from "./forgot_password/verify.js";
import { Reset_password } from "./forgot_password/change_password.js";



export function ForgotPassword() {
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
}
