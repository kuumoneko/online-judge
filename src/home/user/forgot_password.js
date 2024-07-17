import { geturl } from "types";
import React from "react";
import { Verify_password_page } from "./forgot_password/verify.js";
import { Reset_password } from "./forgot_password/change_password.js";
export function ForgotPassword() {
    const url = geturl();
    if (url[2] == "verify") {
        return (React.createElement(Verify_password_page, null));
    }
    else if (url[2] == "reset_password") {
        return (React.createElement(Reset_password, null));
    }
}
//# sourceMappingURL=forgot_password.js.map