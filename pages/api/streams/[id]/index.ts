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

  // 유저에게 보여질 특정 라이브스트림
  const stream = await client.liveStream.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      livemessages: {
        select: {
          id: true,
          msg: true,
          user: {
            select: {
              id: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });
  if (!stream) return res.json({ ok: false });

  // 특정 라이브스트림을 들어온 사람이 스트리머인지 확인
  const isStreamer = stream.userId === user?.id;
  // 스트리머가 아니면 스트림 정보 삭제
  if (stream && !isStreamer) {
    stream.streamKey = "";
    stream.streamUrl = "";
  }
  return res.json({
    ok: true,
    stream,
  });
}
export default withIronSession(withHdr({ methods: ["GET"], handler }));
