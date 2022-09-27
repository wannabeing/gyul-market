// 동네생활 - 질문글 업로드 POST / 질문글 조회 GET

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 새로운 동네생활-글 생성 (POST)
  if (req.method === "POST") {
    const { question, longitude, latitude } = req.body;
    const { user } = req.session;
    const post = await client.post.create({
      data: {
        question,
        longitude,
        latitude,
        user: { connect: { id: user?.id } },
      },
    });

    res.json({
      ok: true,
      post,
    });
  }
  // 동네생활-모든 작성글 조회 (GET)
  else if (req.method === "GET") {
    // pagination 하여 조회해야함
    const posts = await client.post.findMany({
      select: {
        id: true,
        question: true,
        longitude: true,
        latitude: true,
        created: true,
        user: {
          select: { name: true },
        },
        _count: {
          select: {
            answers: true,
            curious: true,
          },
        },
      },
    });

    res.json({
      ok: true,
      posts,
    });
  }
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["POST", "GET"], handler }));
