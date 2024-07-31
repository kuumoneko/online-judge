import nodemailer from "nodemailer";
import { User } from "type";
import { add_users } from "../users/users.ts";
import { getDataFromDatabase, writeDataToDatabase } from "data";
import SMTPConnection from "nodemailer/lib/smtp-connection/index.ts";


function generateVerificationCode(length: number) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function send_code_verify_user(username: string, email: string): Promise<{ status: number, message: string }> {

    const verifying = getDataFromDatabase("auth", "verifying")


    if (verifying[username] != undefined) {
        return {
            status: 400,
            message: "already verifying"
        }
    }
    const verificationCode = generateVerificationCode(6);

    // Configure email transporter (replace with your email service details)

    const system = getDataFromDatabase("system", "system")


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: "465",
        service: 'gmail', // Replace with your email service (e.g., gmail, smtp)
        secure: true,
        auth: {
            user: system.email,
            pass: system.password
        }
    } as unknown as SMTPConnection.Options);

    // Construct email content
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

    writeDataToDatabase("auth", "verifying", verifying)



    // Send the email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return {
            status: 200,
            message: "OK"
        }
    } catch (error: any) {
        // console.error('Error sending email:', error);
        return {
            status: 400,
            message: error
        }
    }
}

export function verify_user(username: string, code: string | number) {
    const verifying = getDataFromDatabase("auth", "verifying")

    console.log(verifying[username])

    if (verifying[username] == undefined) {
        return {
            status: 400,
            data: "Please resend code"
        }
    }
    else if (verifying[username].code != String(code)) {
        return {
            status: 400,
            data: "Wrong code. Please try again"
        }
    }
    else {
        verifying[username] = undefined;
        const users: User[] = getDataFromDatabase("users", "users")
        const user: User = users.find((item: User) => item.username == username) as User;

        user.verified = true;
        add_users(user)
        writeDataToDatabase("auth", "verifying", verifying)


        return {
            status: 200,
            data: "OK"
        }
    }
}