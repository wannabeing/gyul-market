import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { CF_ID, CF_IMG_TOKEN } = process.env;
  // 비어있는 Direct upload URL 얻기 (POST)
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_ID}/images/v1/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CF_IMG_TOKEN}`,
        },
      }
    )
  ).json();

  return res.json({
    ok: true,
    ...response.result,
  });
}
export default withIronSession(withHdr({ methods: ["GET"], handler }));
