import { mailtrapClient,sender } from "./mailtrap.config.js";
import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemplates.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verifyification"
        })
        console.log("Email sent successfully", response)
    }
    catch (error) {
        console.error(`Error sending verification`, error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "a97d9937-22cc-4a3f-b85c-a3c6efd19a21", // ใช้ templates ของ mailtrap
            template_variables: { 
                company_info_name: "Orange Giving Company",
                name: name,

            }
        });

        console.log("Welcome email sent successfully", response);
    }
    catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
    }
    catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
    }
    catch (error) {
        console.error(`Error sending password reset success email`, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
}
