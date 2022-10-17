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
  if (!id) return;
  // 부모 Post가 존재하는지 확인
  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!post) return res.status(404).json({ ok: false, error: "Not Found" });
  // 궁금해요 누른 글이 이미 해당 유저 궁금목록에 존재하는지 확인
  const isCurious = await client.curiousPost.findFirst({
    where: {
      postId: +id.toString(),
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });
  // 궁금목록 이미 존재하면 삭제
  if (isCurious) {
    await client.curiousPost.delete({
      where: { id: isCurious.id },
    });
  }
  //  궁금목록 없으면 생성
  else {
    await client.curiousPost.create({
      data: {
        user: { connect: { id: user?.id } },
        post: { connect: { id: +id.toString() } },
      },
    });
  }
  return res.json({
    ok: true,
  });
}
export default withIronSession(withHdr({ methods: ["POST"], handler }));
