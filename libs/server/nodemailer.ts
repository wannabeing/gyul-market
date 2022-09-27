import nodemailer from "nodemailer";
const { NAV_ID, NAV_PW } = process.env;

export default function SendEmail() {
  return nodemailer.createTransport({
    service: "Naver",
    port: 587,
    host: "smtp.naver.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: NAV_ID,
      pass: NAV_PW,
    },
  });
}
