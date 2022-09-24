// Token Confirm
import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { IResponseT } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponseT>) {
  console.log(req.session);

  const { token } = req.body;
  // 해당 토큰번호가 존재하는지 확인
  const tokenFound = await client.token.findUnique({
    where: { payload: token },
  });
  if (!tokenFound) return res.status(404).end();

  req.session.user = {
    id: tokenFound.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: { userId: tokenFound.userId },
  });
  return res.json({ ok: true });
}
// 고차 함수
export default withApiSession(withHandler("POST", handler));
