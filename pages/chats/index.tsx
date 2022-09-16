import { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <div className="divide-y-[1px] py-10">
      {/* 채팅 1 */}
      <div className="mb-3 flex cursor-pointer items-center space-x-3 px-5 py-3 transition hover:text-orange-500">
        <div className="h-10 w-10 rounded-full bg-slate-300" />
        <div>
          <p className="text-sm font-bold text-gray-700">Steve Jebs</p>
          <p className="text-sm font-medium text-gray-500 ">
            채팅내용잉ㅂ니다.
          </p>
        </div>
      </div>
      {/* 채팅 2 */}
      <div className="mb-3 flex cursor-pointer items-center space-x-3 px-5 py-3 transition hover:text-orange-500">
        <div className="h-10 w-10 rounded-full bg-slate-300" />
        <div>
          <p className="text-sm font-bold text-gray-700">제이비</p>
          <p className="text-sm font-medium text-gray-500 ">
            두번쨰 채팅내용잉ㅂ니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
