// 동네생활 - 질문글 상세 정보 조회 GET

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

  // 질문글 id와 일치하는 질문글(궁금/답변수)/작성자 찾기
  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      answers: {
        select: {
          id: true,
          answer: true,
          created: true,
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          curious: true,
        },
      },
    },
  });

  // 없는 질문글에 접근시 false 반환
  if (!post) return res.json({ ok: false });

  // 찾은 글이 궁금해요 눌렀는지 확인
  const isCurious = Boolean(
    await client.curiousPost.findFirst({
      where: {
        postId: +id.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    ok: true,
    post,
    isCurious,
  });
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["GET"], handler }));
