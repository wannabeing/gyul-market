import { NextPage } from "next";
import Link from "next/link";
import FixBtn from "@components/fixBtn";
import Layout from "@components/layout";

const Stream: NextPage = () => {
  return (
    <Layout title="라이브" hasTabBar>
      <div className="space-y-4 divide-y-2 py-5">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <Link key={i} href={`/stream/${i}`}>
            <a className="block px-5 pt-4">
              <div className="aspect-video w-full rounded-md bg-gray-500 shadow-sm" />
              <h3 className="mt-2 text-lg font-medium text-gray-700">
                라이브 방송 제목
              </h3>
            </a>
          </Link>
        ))}
        {/* 라이브 버튼 */}
        <FixBtn href="/stream/create">
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
        </FixBtn>
      </div>
    </Layout>
  );
};

export default Stream;
