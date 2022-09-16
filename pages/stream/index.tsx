import { NextPage } from "next";

const Stream: NextPage = () => {
  return (
    <div className="space-y-4 divide-y-2 py-10">
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <div key={i} className="px-5 pt-4 ">
          <div className="aspect-video w-full rounded-md bg-gray-500 shadow-sm" />
          <h3 className="mt-2 text-lg font-medium text-gray-700">
            라이브 방송 제목
          </h3>
        </div>
      ))}
      {/* 추가하기 버튼 */}
      <button className="fixed bottom-14 right-2 cursor-pointer rounded-full border border-transparent bg-orange-400 p-5 text-white shadow-2xl transition-colors  hover:bg-orange-500">
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
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Stream;
