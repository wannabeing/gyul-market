// 특정 라이브스트림 조회 GET

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  if (!id) return;

  const stream = await client.liveStream.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      livemessages: {
        select: {
          id: true,
          msg: true,
          user: {
            select: {
              id: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });
  // 존재하지 않는 라이브스트림 조회시 false 반환
  if (!stream) return res.json({ ok: false });

  res.json({
    ok: true,
    stream,
  });
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["GET"], handler }));
