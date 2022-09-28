// 유저 정보 업데이트 (POST)

import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/prisma-client";
import withHdr, { ResponseType } from "@libs/server/withHdr";
import { withIronSession } from "@libs/server/withIronSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;
  const { email, phone, name } = req.body;
  // 로그인 유저 정보
  const currentUser = await client.user.findUnique({
    where: { id: user?.id },
  });

  // 이메일 업데이트 (DB의 이메일과 다른 경우에만 로직 실행)
  if (email && email !== currentUser?.email) {
    // 기존에 존재하는 이메일인지 확인
    const isEmail = Boolean(
      await client.user.findUnique({
        where: { email },
        select: { id: true },
      })
    );

    if (isEmail) {
      res.json({ ok: false, error: "사용중인 이메일입니다." });
    }
    // 존재하지 않으면 유저 정보 업데이트
    await client.user.update({
      where: { id: user?.id },
      data: { email },
    });
    res.json({ ok: true, replace: true });
  }
  // 휴대폰 업데이트 (DB의 휴대폰과 다른 경우에만 로직 실행)
  if (phone && phone !== currentUser?.phone) {
    // 기존에 존재하는 휴대폰번호 확인
    const isPhone = Boolean(
      await client.user.findUnique({
        where: { phone },
        select: { id: true },
      })
    );
    if (isPhone) {
      res.json({ ok: false, error: "사용중인 휴대폰입니다." });
    }
    // 존재하지 않으면 유저 정보 업데이트
    await client.user.update({
      where: { id: user?.id },
      data: { phone },
    });
    res.json({ ok: true, replace: true });
  }
  // 이름 업데이트
  if (name && name !== currentUser?.name) {
    await client.user.update({
      where: { id: user?.id },
      data: { name },
    });
    res.json({ ok: true, replace: true });
  }

  res.json({ ok: false, error: "다시 입력해주세요." });
}
// 고차 함수 (쿠키 사용)
export default withIronSession(withHdr({ methods: ["POST"], handler }));
