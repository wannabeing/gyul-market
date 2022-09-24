// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withHandler, { IResponseT } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import twilio from "twilio";
import SendEmail from "@libs/server/email";

const { TWILIO_SID, TWILIO_TOKEN, TWILIO_MSGID, MY_P } = process.env;
const { NAV_ID } = process.env;

const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<IResponseT>) {
  const { email, phone } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;
  const payload = String(Math.random()).substring(2, 8);

  if (!user) return res.status(400).json({ ok: false });
  // 토큰 생성 및 유저생성
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          create: {
            name: "Anony",
            ...user,
          },
          where: {
            ...user,
          },
        },
      },
    },
  });
  // 휴대폰 가입 인증
  if (phone) {
    /* const msg = await twilioClient.messages.create({
      messagingServiceSid: TWILIO_MSGID,
      to: MY_P!, // 실제 서비스시, 가입 휴대폰번호 들어가야함
      body: `귤마켓 인증 요청입니다. 인증번호: ${payload} 🍊`,
    }); */
  } else if (email) {
    /* const mailOptions = {
      from: NAV_ID, // 실제 서비스시, 서버 메일 들어가야함
      to: NAV_ID, // 실제 서비스시, 가입 메일 들어가야함
      subject: "귤마켓 메일 인증 요청 🍊",
      html: `
      <p>귤마켓 인증번호: <strong>${payload}</strong></p>
    `,
    };
    SendEmail().sendMail(mailOptions, (error) => error && console.log(error)); */
  }
  return res.json({
    ok: true,
  });
}
// 고차 함수
export default withHandler("POST", handler);
