var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from "nodemailer";
import { readFileSync, writeFileSync } from "fs";
import { add_users } from "./users.js";
function generateVerificationCode(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function send_code(username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = readFileSync("G:\\Project\\Data\\verifying.json", { encoding: "utf8" });
        const verifying = JSON.parse(data);
        if (verifying[username] != undefined) {
            return {
                status: 400,
                message: "already verifying"
            };
        }
        const verificationCode = generateVerificationCode(6);
        const dataa = readFileSync("G:\\Project\\Data\\system.json", { encoding: "utf8" });
        const system = JSON.parse(dataa);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: "465",
            service: 'gmail',
            secure: true,
            auth: {
                user: system.email,
                pass: system.password
            }
        });
        const mailOptions = {
            from: 'kuumooj@gmail.com',
            to: email,
            subject: 'Verify Your Account in Kuumooj',
            html: `
      <p>Thank you for signing up for our application!</p>
      <p>Please verify your account by entering the following code:</p>
      <h1>${verificationCode}</h1>
      <p>This code is valid for 5 minutes.</p>
    `
        };
        const now = new Date();
        const tenMinutesFromNow = new Date(now.getTime() + 5 * 60000).getTime();
        verifying[username] = {
            code: verificationCode,
            time: tenMinutesFromNow
        };
        writeFileSync("G:\\Project\\Data\\verifying.json", JSON.stringify(verifying), { encoding: "utf8" });
        try {
            const info = yield transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return {
                status: 200,
                message: "OK"
            };
        }
        catch (error) {
            return {
                status: 400,
                message: error
            };
        }
    });
}
export function verify_user(username, code) {
    const data = readFileSync("G:\\Project\\Data\\verifying.json", { encoding: "utf8" });
    const verifying = JSON.parse(data);
    console.log(verifying[username]);
    if (verifying[username] == undefined) {
        return {
            status: 400,
            data: "Please resend code"
        };
    }
    else if (verifying[username].code != String(code)) {
        return {
            status: 400,
            data: "Wrong code. Please try again"
        };
    }
    else {
        verifying[username] = undefined;
        const temping = readFileSync("G:\\Project\\Data\\users.json", { encoding: "utf8" });
        const users = JSON.parse(temping);
        const user = users.find((item) => item.username == username);
        user.verified = true;
        add_users(user);
        writeFileSync("G:\\Project\\Data\\verifying.json", JSON.stringify(verifying), { encoding: "utf8" });
        return {
            status: 200,
            data: "OK"
        };
    }
}
//# sourceMappingURL=verify.js.map