// 라이브스트림 생성 POST, 모든 라이브스트림 조회 GET

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 라이브 스트림 생성, 라이브 시작 (POST)
  if (req.method === "POST") {
    const { name } = req.body;
    const { user } = req.session;
    const { CF_ID, CF_STREAM_TOKEN } = process.env;

    // cloudflare의 라이브스트리밍 서버 정보 가져오기 (이미지 업로드와 비슷)
    const {
      result: {
        uid: streamId,
        rtmps: { streamKey, url: streamUrl },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CF_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CF_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "timeoutSeconds": 30, "requireSignedURLs": false, "allowedOrigins": ["*.example.com"] }}`,
        }
      )
    ).json();

    // db 저장
    const stream = await client.liveStream.create({
      data: {
        name,
        streamId,
        streamUrl,
        streamKey,

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
        created: "desc",
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
