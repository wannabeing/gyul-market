import { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import useMt from "@libs/client/useMt";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { LiveStream } from "@prisma/client";

interface StreamForm {
  name: string;
}
interface StreamResponse {
  ok: boolean;
  stream: LiveStream;
}

const CreateLiveStream: NextPage = () => {
  // 리액트 훅 폼
  const { register, handleSubmit } = useForm<StreamForm>();
  // API 요청 훅
  const [createStream, { mtloading, mtdata }] =
    useMt<StreamResponse>("/api/streams");

  // 폼 제출시 실행되는 함수
  const onValid = (dataForm: StreamForm) => {
    if (mtloading) return;
    // API 요청 (POST)
    createStream(dataForm);
  };

  const router = useRouter();
  useEffect(() => {
    if (mtdata && mtdata.ok) {
      router.replace(`/streams/${mtdata.stream.id}`);
    }
  }, [router, mtdata]);

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-5 px-5 py-14">
        {/* 라이브 제목 */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            라이브 제목
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            required
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          />
        </div>

        {/* 업로드 버튼 */}
        <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          {!mtloading ? "라이브 시작" : "라이브 생성중"}
        </button>
      </form>
    </Layout>
  );
};

export default CreateLiveStream;
