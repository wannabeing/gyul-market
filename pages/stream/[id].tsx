import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import SendBtn from "@components/sendBtn";

const StreamDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 px-5 py-14">
        <div className="aspect-video w-full rounded-md bg-gray-500 shadow-sm" />
        <div className="mt-5 pb-5">
          <h1 className="text-3xl font-bold text-gray-700">라이브 방송 제목</h1>
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
    </Layout>
  );
};

export default StreamDetail;
