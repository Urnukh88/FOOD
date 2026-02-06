import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();
const { AUTH_EMAIL, AUTH_PASS } = process.env;
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});
export const sendVerificationEmail = async (
  receiver: string,
  verifyEmail: string,
) => {
  await transport.sendMail({
    from: `"Food Delivery App" <${AUTH_EMAIL}>`,
    to: receiver,
    subject: "Verify your email",
    html: `
<a href="${verifyEmail}">
  <div style="width:300px;height:300px;background-color:blue;color:white;display:flex;align-items:center;justify-content:center;">
    VERIFY EMAIL
  </div>
</a>
`,
  });
};
