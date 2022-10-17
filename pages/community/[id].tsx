import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Answer, Post, User } from "@prisma/client";
import useMt from "@libs/client/useMt";
import curious from "pages/api/posts/[id]/curious";
import { cls, timeForToday } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import LoadingList from "@components/loadingList";

interface PostWithUser extends Post {
  user: User;
  _count: { answers: number; curious: number };
  answers: AnswerWithUser[];
}
interface AnswerWithUser extends Answer {
  user: User;
}
interface PostResponse {
  ok: boolean;
  post: PostWithUser;
  isCurious: boolean;
}
interface AnswerForm {
  answer: string;
}
interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  // swr, id에 해당하는 게시글 조회 (GET)
  const { data: postData, mutate } = useSWR<PostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  // 존재하지 않는 질문글에 접근시
  useEffect(() => {
    if (postData?.ok === false) {
      router.replace("/community");
    }
  }, [postData, router]);

  // API 요청 (궁금해요 생성 및 삭제, POST)
  const [cdCurious, { mtloading: curiousAPILoading }] = useMt(
    `/api/posts/${router.query.id}/curious`
  );
  // API 요청 (답변 생성, POST)
  const [createAnswer, { mtdata: answerData, mtloading: answerAPILoading }] =
    useMt<AnswerResponse>(`/api/posts/${router.query.id}/answer`);

  // 궁금해요 버튼 클릭 함수
  const onCuriousClicked = () => {
    if (!postData) return;
    // 궁금해요 상태 선변경 (Optimistic UI update)
    mutate(
      {
        ...postData,
        post: {
          ...postData.post,
          _count: {
            ...postData.post._count,
            curious: postData.isCurious
              ? postData.post._count.curious - 1
              : postData.post._count.curious + 1,
          },
        },
        isCurious: !postData.isCurious,
      },
      false
    );
    // 이전 API요청 완료시에만 API 요청
    if (!curiousAPILoading) {
      cdCurious({});
    }
  };

  // 리액트 훅 폼 (답변 작성)
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  // 답변 업로드 버튼 클릭 실행함수
  const onValid = (dataForm: AnswerForm) => {
    if (answerAPILoading) return;
    createAnswer(dataForm);
  };

  // 답변 업로드가 성공적으로 됐을 때
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset(); // 답변폼 초기화
      mutate(); // re-fetch를 통해 해당 게시글 새로고침
    }
  }, [reset, mutate, answerData]);

  return (
    <Layout
      canGoBack
      title={postData ? `${postData?.post?.question}` : ""}
      pageTitle={postData?.post.question}
    >
      {postData ? (
        <div className="pt-10">
          {/* 태그 */}
          <span
            className={cls(
              postData?.post?.latitude && postData.post?.longitude
                ? "my-3 ml-4 inline-flex items-center rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-bold text-white"
                : "hidden"
            )}
          >
            동네인증
          </span>
          {/* 질문자 프로필 */}
          <Link href={`/profiles/${postData?.post?.user?.name}`}>
            <a className="my-3 flex cursor-pointer items-center space-x-3 border-b px-4 pb-3 transition hover:text-orange-500">
              {/* 프로필사진 */}
              {postData?.post?.user?.avatarUrl ? (
                <div className="h-8 w-8 rounded-full bg-orange-300" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-300" />
              )}
              {/* 질문자 이름 */}
              <div>
                <p className="text-xs font-medium ">
                  {postData?.post?.user.name}
                </p>
              </div>
            </a>
          </Link>
          {/* 질문내용 */}
          <div>
            {/* 질문 제목 */}
            <div className="px-5 py-5 font-medium text-gray-700">
              <span className="text-orange-500">Q. </span>
              <span className="font-medium">{postData?.post?.question}</span>
            </div>
            {/* 궁금해요, 답변란 */}
            <div className="mt-3 flex w-full space-x-5 border-t border-b-2 py-3 text-gray-700">
              <button
                onClick={onCuriousClicked}
                className={cls(
                  "flex items-center space-x-2 px-5 text-sm",
                  postData?.isCurious ? "font-bold text-blue-700" : ""
                )}
              >
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
                <span>궁금해요 {postData?.post?._count.curious}</span>
              </button>
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
                <span>답변 {postData?.post?._count.answers}</span>
              </span>
            </div>
          </div>
          {/* 답변 리스트 */}
          <div className="my-5 space-y-5 px-5">
            {postData?.post?.answers.map((answer) => (
              <div key={answer.id} className="flex items-start space-x-3">
                {/* 답변자 프로필사진 */}
                <div className="h-8 w-8 rounded-full bg-slate-200" />
                {/* 답변자 정보 */}
                <div>
                  <Link href={`/profiles/${answer.user.name}`}>
                    <a className="transition hover:text-orange-500">
                      <span className="block text-sm font-medium ">
                        {answer.user.name}
                      </span>
                      <span className="block text-xs text-gray-500 ">
                        {timeForToday(answer.created) + ""}
                      </span>
                    </a>
                  </Link>
                  <span className="mt-2 text-gray-700">{answer.answer}</span>
                </div>
              </div>
            ))}
          </div>
          {/* 답변 폼 */}
          <form onSubmit={handleSubmit(onValid)} className="px-5">
            <textarea
              {...register("answer")}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 "
              rows={4}
              placeholder="답변 해주세요!"
              minLength={5}
              required
            />
            {/* 업로드 버튼 */}
            <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              {answerAPILoading ? "등록중" : "답변 등록"}
            </button>
          </form>
        </div>
      ) : (
        <LoadingList />
      )}
    </Layout>
  );
};

export default CommunityPostDetail;
