// 페이지 보호 (로그인 여부)

import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  // swr에 로그인 사용자 정보 저장 (쿠키에 로그인되어있는 정보)
  const { data, error } = useSWR<ProfileResponse>("/api/users/whoLogin");

  // 로그인되어있지 않으면 replace
  const router = useRouter();
  useEffect(() => {
    if (!data?.ok && router.pathname !== "/enter") {
      router.replace("/enter");
    }
  }, [router, data]);

  return {
    user: data?.profile,
    userLoading: !data && !error,
  };
}
