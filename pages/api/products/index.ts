// 상품 등록 API

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 상품 생성
  if (req.method === "POST") {
    const { name, price, des } = req.body;
    const { user } = req.session;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        des,
        imgUrl: "",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      product,
    });
  }
  // 상품 조회
  if (req.method === "GET") {
    const products = await client.product.findMany({});
    res.json({
      ok: true,
      products,
    });
  }
}
// 고차 함수 (쿠키 사용)
export default withIronSession(
  withHdr({ methods: ["POST", "GET"], handler: handler })
);
