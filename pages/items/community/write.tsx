import type { NextPage } from "next";

const CommunityWrite: NextPage = () => {
  return (
    <form className="px-5 py-10">
      {/* 답변 폼 */}
      <textarea
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 "
        rows={4}
        placeholder="질문 내용을 적어주세요!"
      />
      {/* 업로드 버튼 */}
      <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        질문 등록
      </button>
    </form>
  );
};

export default CommunityWrite;
