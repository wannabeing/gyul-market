import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  const buyList = await client.buyList.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      created: "desc",
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

  return res.json({
    ok: true,
    buyList,
  });
}
export default withIronSession(withHdr({ methods: ["GET"], handler }));
