import type { NextPage } from "next";
import Link from "next/link";
import FixBtn from "@components/fixBtn";
import Layout from "@components/layout";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import { cls, timeForToday } from "@libs/client/utils";
import useLocation from "@libs/client/useLocation";
import LoadingList from "@components/loadingList";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Page from "twilio/lib/base/Page";
import client from "@libs/server/prisma-client";

interface PostWithUser extends Post {
  user: User;
  _count: { answers: number; curious: number };
}
interface PostResponse {
  ok: boolean;
  posts: PostWithUser[];
}

const Community: NextPage<{ posts: PostResponse }> = ({ posts }) => {
  const [page, setPage] = useState(1);
  const { handleSubmit } = useForm();

  // SWR로 동네생활 글목록 조회 (GET)
  const { data } = useSWR<PostResponse>(`/api/posts?page=${page}`);

  // 더보기 클릭 시 실행되는 함수
  const onValid = () => {
    setPage((prev) => prev + 1);
  };
  // 더보기 클릭시 스크롤 자동 이동
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (data && data.ok) {
      scrollRef?.current?.scrollIntoView();
    }
  }, [data]);

  return (
    <Layout title="동네생활" hasTabBar pageTitle="동네생활">
      {data ? (
        <div className="space-y-8 py-12 px-5">
          {/* 질문 리스트 */}
          {data?.posts.map((post) => (
            <Link key={post.id} href={`/community/${post.id}`}>
              <a className="flex cursor-pointer flex-col items-start">
                {/* 태그 */}
                <span
                  className={cls(
                    post.latitude && post.longitude
                      ? "mb-0.5 flex items-center rounded-full bg-green-600 px-2.5 py-1 text-xs font-bold text-white"
                      : "hidden"
                  )}
                >
                  동네인증
                </span>
                {/* 질문 제목 */}
                <div className="font-medium text-gray-700">
                  <span className="text-orange-500">Q. </span>
                  <span className="font-medium hover:font-bold">
                    {post.question}
                  </span>
                </div>
                {/* 질문 작성자 */}
                <div className="mt-5 flex w-full items-center justify-between text-xs font-medium text-gray-700">
                  <span>{post.user.name}</span>
                  <span>{timeForToday(post.created) + ""}</span>
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
                    <span>궁금해요 {post._count.curious}</span>
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
                    <span>답변 {post._count.answers}</span>
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <LoadingList />
      )}
      <div ref={scrollRef} />
      <div className="mx-5 mb-12 mt-4 flex items-center justify-center hover:text-orange-500">
        <form onSubmit={handleSubmit(onValid)}>
          <button className="flex rounded-md bg-gray-200 p-2 px-5 text-sm hover:font-bold">
            더보기
          </button>
        </form>
      </div>
      {/* 픽스 버튼 */}
      <FixBtn href="/community/write">
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
      </FixBtn>
    </Layout>
  );
};

// ODR TEST CODE 🔥
// with /api/posts/index.ts - GET Functions
export async function getStaticProps() {
  console.log("ODR 실행");
  const page = 1;
  const posts = await client.post.findMany({
    select: {
      id: true,
      question: true,
      longitude: true,
      latitude: true,
      created: true,
      user: {
        select: { name: true },
      },
      _count: {
        select: {
          answers: true,
          curious: true,
        },
      },
    },
    take: 3 * +page.toString(),
    orderBy: {
      created: "desc",
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
export default Community;
