import type { NextPage } from "next";

const CommunityPostDetail: NextPage = () => {
  return (
    <div>
      {/* 태그 */}
      <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
        동네질문
      </span>
      {/* 질문자 프로필 */}
      <div className="mb-3 flex cursor-pointer items-center space-x-3 border-b px-4  pb-3 transition hover:text-orange-500">
        <div className="h-10 w-10 rounded-full bg-slate-300" />
        <div>
          <p className="text-sm font-medium ">Steve Jebs</p>
        </div>
      </div>
      {/* 질문내용 */}
      <div>
        {/* 질문 제목 */}
        <div className="px-5 font-medium text-gray-700">
          <span className="text-orange-500">Q. </span>
          <span className="font-medium hover:font-bold">먹을거 추천점</span>
        </div>
        {/* 궁금해요, 답변란 */}
        <div className="mt-3 flex w-full space-x-5 border-t border-b-2 py-3 text-gray-700">
          <span className="flex items-center space-x-2 px-5 text-sm">
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
      {/* 답변 리스트 */}
      <div className="my-5 space-y-5 px-5">
        {/* 답변 1 */}
        <div className="flex items-start space-x-3">
          <div className="h-8 w-8 rounded-full bg-slate-200" />
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Steve Jebs
            </span>
            <span className="block text-xs text-gray-500 ">2시간 전</span>
            <p className="mt-2 text-gray-700">
              The best mandu restaurant is the one next to my house.
            </p>
          </div>
        </div>
        {/* 답변 2 */}
        <div className="flex items-start space-x-3">
          <div className="h-8 w-8 rounded-full bg-slate-200" />
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Steve Jebs
            </span>
            <span className="block text-xs text-gray-500 ">2시간 전</span>
            <p className="mt-2 text-gray-700">
              The best mandu restaurant is the one next to my house.
            </p>
          </div>
        </div>
      </div>
      {/* 답변 폼 */}
      <div className="px-5">
        <textarea
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 "
          rows={4}
          placeholder="답변 해주세요!"
        />
        {/* 업로드 버튼 */}
        <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          답변 등록
        </button>
      </div>
    </div>
  );
};

export default CommunityPostDetail;
