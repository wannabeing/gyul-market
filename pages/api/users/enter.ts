import withHdr, { ResponseType } from "@libs/server/withHdr";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import twilio from "twilio";
import sendgrid from "@sendgrid/mail";
import SendEmail from "@libs/server/nodemailer";

const {
  TWILIO_SID,
  TWILIO_TOKEN,
  TWILIO_MSGID,
  MY_P,
  SENDGRID_APIKEY,
  MY_EMAIL,
  NAV_ID,
} = process.env;
// sendgird 연결 (for mail)
sendgrid.setApiKey(SENDGRID_APIKEY!);
// twilio 연결 (for sms)
const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);

// handler: {ok:true} 반환하는 함수
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  const payload = String(Math.random()).substring(2, 8); // 임의의 토큰번호
  if (!user) return res.status(400).json({ ok: false });

  // 토큰 생성 및 유저생성
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          create: {
            name: "익명",
            ...user,
          },
          where: {
            ...user,
          },
        },
      },
    },
  });
  // sms 인증 요청
  if (phone) {
    const sms = await twilioClient.messages.create({
      messagingServiceSid: TWILIO_MSGID,
      to: MY_P!, // 실제 서비스시, phone 변수가 들어가야 함 (+82 추가해야함)
      body: `귤마켓 인증 요청입니다. 인증번호: ${payload} 🍊`,
    });
    return res.json({ ok: true });
  }
  // mail 인증 요청
  if (email) {
    // ❌ SENDGRID 사용시
    /*
    const mail = await sendgrid.send({
      from: MY_EMAIL!,
      to: MY_EMAIL!,
      subject: "귤마켓 메일 인증 요청 🍊",
      html: `<p>귤마켓 인증번호: <strong>${payload}</strong></p>`,
    }); */

    // ❌ nodeMailer 사용시
    const mailOptions = {
      from: NAV_ID, // 실제 서비스시, 서버 메일 들어가야함
      to: NAV_ID, // 실제 서비스시, 가입 메일 들어가야함
      subject: "귤마켓 메일 인증 요청 🍊",
      html: `
      <p>귤마켓 인증번호: <strong>${payload}</strong></p>
    `,
    };
    SendEmail().sendMail(mailOptions, (error) => error && console.log(error));
    return res.json({ ok: true });
  }
  return res.json({ ok: true });
}
export default withHdr({ methods: ["POST"], handler, isPrivate: false });
