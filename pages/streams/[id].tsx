import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import SendBtn from "@components/sendBtn";
import useSWR from "swr";
import { useRouter } from "next/router";
import { LiveStream } from "@prisma/client";
import { useEffect } from "react";

interface StreamResponse {
  ok: boolean;
  stream: LiveStream;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();

  // swr, 특정 ID 라이브스트림 데이터 조회 (GET)
  const { data } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  // 존재하지 않는 라이브스트림 접근시, 목록으로 replace
  useEffect(() => {
    if (data?.ok === false) {
      router.replace("/streams");
    }
  }, [data, router]);

  return (
    <Layout canGoBack>
      {data ? (
        <div className="space-y-4 px-5 py-14">
          <div className="aspect-video w-full rounded-md bg-gray-500 shadow-sm" />
          <div className="mt-5 pb-5">
            {/* 라이브 제목 */}
            <h1 className="text-3xl font-bold text-gray-700">
              {data?.stream?.name}
            </h1>
          </div>
          {/* 채팅 */}
          <div className="my-10 h-[50vh] space-y-5 overflow-y-scroll px-5 pb-16">
            <Message text="라이브1" />
            <Message text="라이브1" />
            <Message text="라이브1" mytext />
            <Message text="라이브1" />
            <Message text="라이브1" mytext />
            <Message text="라이브1" mytext />
          </div>
          {/* 메시지 버튼 */}
          <SendBtn />
        </div>
      ) : (
        // 로딩
        <div className="space-y-4 px-5 py-14">
          <div className="aspect-video w-full rounded-md bg-gray-500 shadow-sm" />
          <div className="mt-5 pb-5">
            {/* 라이브 제목 */}
            <div className=" rounded-md bg-gray-200 p-5" />
          </div>
          {/* 채팅 */}
          <div className="my-10 h-[50vh] space-y-5 rounded-md bg-gray-200 px-5 pb-16"></div>
          {/* 메시지 버튼 */}
          <SendBtn />
        </div>
      )}
    </Layout>
  );
};

export default StreamDetail;
