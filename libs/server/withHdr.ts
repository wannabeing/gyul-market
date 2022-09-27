import type { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "POST" | "GET" | "DELTETE";

interface Ihandler {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHdr({
  methods,
  handler,
  isPrivate = true,
}: Ihandler) {
  // return
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    // 잘못된 접근일 경우 (ex: POST/GET/DELETE 이외의 경우)
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    // 잘못된 접근일 경우 (ex: 로그인이 안되어 있음)
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "로그인 해주세요!" });
    }
    try {
      // 감싸진 함수가 실행되는 곳
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
