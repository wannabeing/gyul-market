import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";

const ChatsDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-5 py-12 px-5">
        {/* 상대 메시지 1 */}
        <Message text="Hi how much are you selling them for?" />
        {/* 내 메시지 */}
        <Message text="2만원" mytext />
        {/* 상대 메시지 2 */}
        <Message text="미쳤네" />
        {/* 메시지 입력 폼 */}
        <form className="fixed inset-x-0 bottom-4 mx-auto w-full  max-w-md rounded-full shadow-xl">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full rounded-full border-none bg-gray-100 pr-12 text-sm text-gray-700 shadow-sm placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="메시지 보내기"
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
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatsDetail;
