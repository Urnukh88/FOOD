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
    subject: "Амжилттай бүртгэгдлээ",
    html: `
        <div style="font-family:sans-serif; text-align:center;">
          <h2>Амжилттай бүртгэгдлээ</h2>
          <p>Таны бүртгэл амжилттай боллоо.</p>
        </div>
      `,
  });
};
