import nodemailer from "nodemailer";

type SendMailRequest = {
  adminEmail: string;
  emailHost: string;
  emailPort: number;
  emailSecure: boolean;
  emailLoginName: string;
  emailPassword: string;
  emailFrom: string;
  emailFromName: string;
};

export default defineEventHandler(async (event) => {
  const {
    adminEmail,
    emailFrom,
    emailFromName,
    emailLoginName,
    emailHost,
    emailPassword,
    emailPort,
    emailSecure,
  } = (await readBody(event)) as SendMailRequest;
  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailSecure,
    auth: {
      user: emailLoginName,
      pass: emailPassword,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${emailFromName}" <${emailFrom}>`,
      to: adminEmail,
      subject: "Moments邮件测试",
      text: "发送邮件成功了,老板!",
    });
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error:any) {
    return {
      success: false,
      messageId: error.response,
    };
  }
});
