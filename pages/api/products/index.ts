import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 상품 생성 (POST)
  if (req.method === "POST") {
    const { name, price, des, imgUrl } = req.body;

    const { user } = req.session;
    const product = await client.product.create({
      data: {
        name,
        price,
        des,
        imgUrl,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.json({
      ok: true,
      product,
    });
  }
  // 모든 상품 조회 (GET)
  if (req.method === "GET") {
    const { page } = req.query;
    if (!page) return;

    const products = await client.product.findMany({
      include: {
        _count: {
          select: { favLists: true },
        },
      },
      take: 5 * +page.toString(),
      orderBy: {
        created: "desc",
      },
    });
    return res.json({
      ok: true,
      products,
    });
  }
}
export default withIronSession(
  withHdr({ methods: ["POST", "GET"], handler, isPrivate: true })
);
