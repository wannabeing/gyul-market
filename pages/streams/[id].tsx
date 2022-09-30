import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import SendBtn from "@components/sendBtn";
import useSWR from "swr";
import { useRouter } from "next/router";
import { LiveMessage, LiveStream } from "@prisma/client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useMt from "@libs/client/useMt";
import messages from "pages/api/streams/[id]/messages";
import useUser from "@libs/client/useUser";

interface StreamResponse {
  ok: boolean;
  stream: StreamWithStreamMsg;
}
interface StreamMsgForm {
  msg: string;
}
interface StreamMsgResponse {
  ok: boolean;
  streamMsg: LiveMessage;
}
interface StreamMsg {
  id: number;
  msg: string;
  user: { id: number; avatarUrl?: string };
}
interface StreamWithStreamMsg extends LiveStream {
  livemessages: StreamMsg[];
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();

  // swr, 특정 ID 라이브스트림 데이터 조회 (GET) , 1000ms마다 re-fetch
  const { data: streamData, mutate: streamMutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );
  // 존재하지 않는 라이브스트림 접근시, 목록으로 replace
  useEffect(() => {
    if (streamData?.ok === false) {
      router.replace("/streams");
    }
  }, [streamData, router]);

  // 라이브스트림 메시지 리액트 훅 폼
  const { register, handleSubmit, reset } = useForm<StreamMsgForm>();
  // 라이브스트림 메시지 생성 API (POST)
  const [createStreamMsg, { mtloading: msgLoading, mtdata: msgData }] =
    useMt<StreamMsgResponse>(`/api/streams/${router.query.id}/messages`);
  // 라이브스트림 메시지 폼 제출 시 실행되는 함수
  const onValid = (dataForm: StreamMsgForm) => {
    if (msgLoading) return;
    reset();
    // API 요청 전(DB 적용 전에)에 mutate함수를 통해서 실시간 채팅처럼 구현
    streamMutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            livemessages: [
              ...prev.stream.livemessages,
              {
                id: Date.now(),
                message: dataForm.msg,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    // 라이브스트림 메시지 API 요청 (POST)
    createStreamMsg(dataForm);
  };

  /*
    성공적으로 라이브스트림 메시지를 생성하면 (DB적용 이후) 라이브스트림 전체데이터 re-fetch
    실시간 채팅처럼 구현 (serverless)
    ✓ 단점: DB적용 이후에 re-fetch하므로 조금 느리다.

    useEffect(() => {
    if (msgData && msgData.ok) {
      streamMutate();
    }
  }, [msgData, streamMutate]);
  */

  // 채팅창의 스크롤을 맨 밑으로 유지
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  return (
    <Layout canGoBack>
      {streamData ? (
        <div className="space-y-5 px-5 py-14">
          {streamData.stream.streamId ? (
            <iframe
              src={`https://iframe.videodelivery.net/${streamData.stream.streamId}`}
              className="aspect-video w-full rounded-md shadow-sm"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            />
          ) : (
            <div className="aspect-video w-full rounded-md bg-gray-400 shadow-sm" />
          )}

          <div className="mt-5 border-b pb-5">
            {/* 라이브 제목 */}
            <h1 className="text-2xl font-bold text-gray-700">
              {streamData?.stream?.name}
            </h1>
            <div className="flex max-w-lg flex-col items-center justify-center overflow-scroll border-none px-5 pb-5">
              <span className="text-red-400">
                {streamData?.stream?.streamKey}
              </span>
              <span className="text-red-400">
                {streamData?.stream?.streamUrl}
              </span>
            </div>
          </div>
          {/* 채팅 */}
          <div className="my-10 h-[25vh] space-y-5 overflow-y-scroll px-5">
            {streamData.stream.livemessages.map((livemessage) => (
              <Message
                key={livemessage.id}
                text={livemessage.msg}
                mytext={livemessage.user.id === user?.id}
              />
            ))}
            {/* 채팅의 스크롤 맨밑으로 유지 */}
            <div ref={scrollRef} />
          </div>
          {/* 채팅 버튼 */}
          <div className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-lg rounded-full shadow-xl">
            <form
              onSubmit={handleSubmit(onValid)}
              className="relative flex items-center"
            >
              <input
                {...register("msg")}
                type="text"
                className="w-full rounded-full border-none bg-gray-100 pr-12 text-sm text-gray-700 shadow-sm placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="메시지 보내기"
                required
              />
              {/* 메시지 전송 버튼 */}
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-3">
                <button className="flex cursor-pointer items-center text-gray-700 hover:text-orange-500">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
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
        </div>
      )}
    </Layout>
  );
};

export default StreamDetail;
