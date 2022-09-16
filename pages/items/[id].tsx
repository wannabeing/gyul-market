import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const ItemDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-5 pt-10">
        <div className="mb-5 border-b pb-5">
          {/* 상품 상세 이미지 */}
          <div className="h-96 rounded-md bg-gray-300" />
          {/* 유저 프로필 */}
          <Link href="/profile">
            <a className="flex cursor-pointer items-center space-x-3 border-b py-5 transition hover:text-orange-500">
              <div className="h-12 w-12 rounded-full bg-gray-300" />
              <div>
                <p className="text-sm font-medium">Steve Jebs</p>
              </div>
            </a>
          </Link>
          {/* 상품 설명 */}
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-700">Galaxy S50</h1>
            <p className="my-3 block text-right text-3xl text-gray-700">$140</p>
            <p className="mb-3 text-base text-gray-800">
              My money&apos;s in that office, right? If she start giving me some
              bullshit about it ain&apos;t there, and we got to go someplace
              else and get it, I&apos;m gonna shoot you in the head then and
              there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
              out where my goddamn money is. She gonna tell me too. Hey, look at
              me when I&apos;m talking to you, motherfucker. You listen: we go
              in there, and that ni**a Winston or anybody else is in there, you
              the first motherfucker to get shot. You understand?
            </p>
            <div className="flex items-center justify-between space-x-2">
              <button className="focus:ring-off flex-1 rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                Talk to seller
              </button>
              <button className="flex items-center justify-center rounded-md p-3 text-red-400 hover:text-red-600">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* 비슷한 상품들 */}
        <div className="cursor-pointer">
          <h2 className="text-2xl font-bold text-gray-700">
            비슷한 상품 or 스티브님의 다른 상품
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="mb-3 h-56 rounded-md bg-gray-400 transition hover:bg-gray-700" />
                <h3 className="-mb-1 text-sm text-gray-700">Galaxy S60</h3>
                <span className="text-sm font-medium text-gray-700">$6</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
