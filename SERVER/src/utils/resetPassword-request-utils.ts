import { Resend } from "resend";
import { configDotenv } from "dotenv";

configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetTokenEmail = async (receiver: string, token: string) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: receiver,
      subject: "Password Reset Token",
      html: `
        <div style="font-family:sans-serif; text-align:center;">
          <h2>Password Reset</h2>
          <p>Use the token below to reset your password. It is valid for 15 minutes.</p>
          <h3 style="color:#00bfff;">${token}</h3>
        </div>
      `,
    });
    console.log("Token email sent to:", receiver);
  } catch (error) {
    console.error("Resend error:", error);
  }
};
