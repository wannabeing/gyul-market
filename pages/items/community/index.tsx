import type { NextPage } from "next";

const Community: NextPage = () => {
  return (
    <div className="space-y-8 py-16 px-5">
      {/* 질문 리스트 */}
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <div key={i} className="flex cursor-pointer flex-col items-start">
          {/* 태그 */}
          <span className="mb-0.5 flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
            동네질문
          </span>
          {/* 질문 제목 */}
          <div className="font-medium text-gray-700">
            <span className="text-orange-500">Q. </span>
            <span className="font-medium hover:font-bold">먹을거 추천점</span>
          </div>
          {/* 질문 작성자 */}
          <div className="mt-5 flex w-full items-center justify-between text-xs font-medium text-gray-700">
            <span>제이비</span>
            <span>18시간 전</span>
          </div>
          {/* 궁금해요, 답변란 */}
          <div className="mt-3 flex w-full space-x-5 border-t border-b-2 py-3 text-gray-700">
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 1</span>
            </span>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
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
              <span>답변 1</span>
            </span>
          </div>
        </div>
      ))}
      {/* 추가하기 버튼 */}
      <button className="fixed bottom-20 right-5 cursor-pointer rounded-full border bg-orange-400 p-5 text-white shadow-xl transition-colors hover:bg-orange-500">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Community;
