import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  const { id } = req.query;
  const { msg } = req.body;
  if (!id) return;

  const streamMsg = await client.liveMessage.create({
    data: {
      msg,
      user: {
        connect: {
          id: user?.id,
        },
      },
      livestream: {
        connect: {
          id: +id.toString(),
        },
      },
    },
  });

  return res.json({
    ok: true,
    streamMsg,
  });
}
export default withIronSession(withHdr({ methods: ["POST"], handler }));
