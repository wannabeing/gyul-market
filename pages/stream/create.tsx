import { NextPage } from "next";
import FixBtn from "../../components/fixBtn";
import Layout from "../../components/layout";

const CreateStream: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="space-y-5 px-5 py-14">
        {/* 라이브 제목 */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            라이브 제목
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>

        {/* 업로드 버튼 */}
        <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          라이브 시작
        </button>
      </form>
    </Layout>
  );
};

export default CreateStream;
