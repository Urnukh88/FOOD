import { Resend } from "resend";
import { configDotenv } from "dotenv";

configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (
  receiver: string,
  resetLink: string,
) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: receiver,
      subject: "Reset your password",
      html: `
        <div style="text-align:center; font-family:sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password. This link is valid for 15 minutes.</p>
          <a href="${resetLink}" style="
            display:inline-block;
            padding:10px 20px;
            background-color:#00bfff;
            color:white;
            text-decoration:none;
            border-radius:5px;
            font-weight:bold;
          ">RESET PASSWORD</a>
        </div>
      `,
    });
    console.log("Email sent to:", receiver);
  } catch (error) {
    console.error("Resend error:", error);
  }
};
