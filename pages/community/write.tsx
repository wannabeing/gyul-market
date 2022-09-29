import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import useMt from "@libs/client/useMt";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useLocation from "@libs/client/useLocation";

interface PostForm {
  question: string;
}
interface PostResponse {
  ok: boolean;
  post: Post;
}

const CommunityWrite: NextPage = () => {
  // 리액트 훅 폼
  const { register, handleSubmit, reset } = useForm<PostForm>();

  // API 요청 (POST)
  const [uploadPost, { mtdata, mtloading }] = useMt<PostResponse>("/api/posts");

  const router = useRouter();
  useEffect(() => {
    // 게시글 생성시, 해당 글 링크로 이동
    if (mtdata?.ok) {
      router.replace(`/community/${mtdata.post.id}`);
    }
  }, [mtdata, router]);

  // 업로드 버튼 클릭시 실행되는 함수
  const onValid = (dataForm: PostForm) => {
    if (mtloading) return;
    uploadPost({ ...dataForm, latitude, longitude });
    reset();
  };

  const { longitude, latitude } = useLocation();

  return (
    <Layout canGoBack>
      <form className="px-5 py-14" onSubmit={handleSubmit(onValid)}>
        {/* 답변 폼 */}
        <textarea
          {...register("question")}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 "
          rows={4}
          placeholder="질문 내용을 적어주세요!"
          required
          minLength={5}
        />
        {/* 업로드 버튼 */}
        <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          {mtloading ? "등록중" : "질문 등록"}
        </button>
      </form>
    </Layout>
  );
};

export default CommunityWrite;
