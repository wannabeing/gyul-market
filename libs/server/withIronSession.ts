/* 
iron-session을 사용하기 위한 고차함수
iron-session: req.session(암호화된 쿠키)을 사용할 수 있게 도와주는 stateless session 도구
*/
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
  }
}
const { COOKIE_PW } = process.env;

const cookieOptions = {
  cookieName: "gyul-session",
  password: COOKIE_PW!,
};

export const withIronSession = (fn: any) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};
