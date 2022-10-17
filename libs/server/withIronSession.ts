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
