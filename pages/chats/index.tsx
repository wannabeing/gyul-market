import { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px] py-3">
        {/* 채팅 1 */}
        {[1, 1, 1, 1, 1].map((_, i) => (
          <Link key={i} href={`/chats/${i}`}>
            <a className="flex cursor-pointer items-center space-x-3 px-5 py-5 transition hover:bg-gray-200">
              <div className="h-10 w-10 rounded-full bg-slate-300" />
              <div>
                <p className="text-sm font-bold text-gray-700">제이비</p>
                <p className="text-sm font-medium text-gray-500 ">
                  채팅내용잉ㅂ니다.
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
