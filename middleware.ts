import { NextRequest, NextFetchEvent, userAgent } from "next/server";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ua = userAgent(req);
}
