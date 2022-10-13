// 사용자가 입력한 토큰이 유효한 토큰인지 확인한다.

import withHdr, { ResponseType } from "@libs/server/withHdr";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 사용자에게 받은 토큰번호
  const { token } = req.body;

  // 해당 토큰번호가 존재하는지 확인
  const tokenFound = await client.token.findUnique({
    where: { payload: token },
  });

  if (!tokenFound) return res.status(404).end();

  // 토큰번호에 해당하는 유저정보를 쿠키에 저장
  req.session.user = {
    id: tokenFound.userId,
  };
  await req.session.save();

  // 유저가 갖고 있는 토큰 모두 삭제
  // await client.token.deleteMany({
  //   where: { userId: tokenFound.userId },
  // });

  return res.json({ ok: true });
}
// 고차 함수
export default withIronSession(
  withHdr({ methods: ["POST"], handler, isPrivate: false })
);
