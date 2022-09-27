import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  // swr에 로그인 사용자 정보 저장
  const { data, error } = useSWR("/api/users/whoLogin");

  // 로그인되어있지 않으면 replace
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [router, data]);

  return {
    user: data?.profile,
    userLoading: !data && !error,
  };
}
