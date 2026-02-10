import { configDotenv } from "dotenv";
import { Resend } from "resend";
configDotenv();
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (
  receiver: string,
  verifyEmail: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: receiver,
    subject: "Verify your email",
    html: `
    <a href="${verifyEmail}">
    <div style="width:150px;height:150px;background-color:aqua;color:black;display:flex;align-items:center;justify-content:center; padding-left:30px; padding-top:30px">
    VERIFY EMAIL
    </div>
    </a>
    `,
  });
};
