// 상품 등록 API

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const { user } = req.session;

  if (!id) return;

  // 상품/상품 판매자 찾기
  const product = await client.product.findUnique({
    where: { id: +id.toString() },
    include: { user: { select: { id: true, name: true, avatarUrl: true } } },
  });

  //  비슷한 상품 찾기 (최대 4개)
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: { not: product?.id },
      },
    },
    take: 4,
  });
  // 찾은 상품이 좋아요버튼을 눌렀는지 확인
  const isFavProduct = Boolean(
    await client.favList.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    ok: true,
    product,
    relatedProducts,
    isFavProduct,
  });
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["GET"], handler: handler }));
