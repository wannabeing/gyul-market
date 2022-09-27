// 동네생활 - 답변 생성 POST

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
  const { answer } = req.body;
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

  // 답변 생성
  const createAnswer = await client.answer.create({
    data: {
      answer,
      user: { connect: { id: user?.id } },
      post: { connect: { id: +id.toString() } },
    },
  });

  res.json({
    ok: true,
    answer: createAnswer,
  });
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["POST"], handler }));
