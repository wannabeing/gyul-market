// 라이브스트림 생성 POST, 모든 라이브스트림 조회 GET

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 라이브 스트림 생성 (POST)
  if (req.method === "POST") {
    const { name } = req.body;
    const { user } = req.session;

    const stream = await client.liveStream.create({
      data: {
        name,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      stream,
    });
  }
  // 모든 라이브 스트림 조회 (GET)
  if (req.method === "GET") {
    const streams = await client.liveStream.findMany({
      select: {
        id: true,
        name: true,
        created: true,
      },
      take: 10,
      orderBy: {
        created: "asc",
      },
    });

    res.json({
      ok: true,
      streams,
    });
  }
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["GET", "POST"], handler }));
