// CF에게 이미지 업로드 URL 받는 API (GET)

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { CF_ID, CF_TOKEN } = process.env;
  // 비어있는 Direct upload URL 얻기 (POST)
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_ID}/images/v1/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CF_TOKEN}`,
        },
      }
    )
  ).json();

  res.json({
    ok: true,
    ...response.result,
  });
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["GET"], handler }));
