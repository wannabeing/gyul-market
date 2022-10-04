// 로그인 유저의 리뷰목록 조회 (GET)

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  const reviews = await client.review.findMany({
    where: {
      receivedId: user?.id,
    },
    include: {
      writer: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });

  res.json({
    ok: true,
    reviews,
  });
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["GET"], handler }));
