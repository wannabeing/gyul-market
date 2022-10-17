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

  // 부모 Product가 존재하는지 확인
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!product) return res.status(404).json({ ok: false, error: "Not Found" });
  // 좋아요 누른 상품이 이미 해당 유저 관심목록에 존재하는지 확인
  const isFav = await client.favList.findFirst({
    where: {
      productId: +id.toString(),
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });
  // 관심목록에 이미 존재하면 삭제
  if (isFav) {
    await client.favList.delete({
      where: { id: isFav.id },
    });
  }
  // 관심목록에 없으면 생성
  else {
    await client.favList.create({
      data: {
        user: { connect: { id: user?.id } },
        product: { connect: { id: +id.toString() } },
      },
    });
  }
  return res.json({ ok: true });
}
export default withIronSession(
  withHdr({ methods: ["POST"], handler: handler })
);
