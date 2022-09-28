// 로그인한 유저의 관심목록 조회 (GET)

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  const favList = await client.favList.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: { favLists: true },
          },
        },
      },
    },
  });

  res.json({
    ok: true,
    favList,
  });
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["GET"], handler }));
