import { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <div className="space-y-4 px-5 py-10">
      {/* 프로필 이미지 수정 */}
      <div className="flex flex-col items-center justify-center space-y-3 space-x-3">
        <div className="h-14 w-14 rounded-full bg-gray-500" />
        <label
          htmlFor="img"
          className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-xs font-medium text-gray-700 shadow-sm hover:border-orange-500 hover:bg-orange-400 hover:text-white focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          프로필 이미지 변경
          <input accept="image/*" id="img" type="file" className="hidden" />
        </label>
      </div>
      {/* 이메일 수정 */}
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="cursor-pointer text-sm font-medium text-gray-700"
        >
          이메일
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        />
      </div>
      {/* 전화번호 수정 */}
      <div className="space-y-1">
        <label
          htmlFor="phone"
          className="cursor-pointer text-sm font-medium text-gray-700"
        >
          휴대폰
        </label>
        <div className="flex rounded-md shadow-sm">
          <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 px-3 text-sm text-gray-500 ">
            +82
          </span>
          <input
            id="input"
            type="number"
            required
            className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>
      </div>
      {/* 수정 버튼 */}
      <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        수정하기
      </button>
    </div>
  );
};

export default EditProfile;
