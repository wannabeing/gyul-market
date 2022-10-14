import { useEffect, useState } from "react";
import { cls } from "@libs/client/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useMt from "@libs/client/useMt";
import Head from "next/head";
import client from "@libs/server/prisma-client";

interface IEnterForm {
  email?: string;
  phone?: string;
}
interface ITokenForm {
  token: string;
}
interface MutationResult {
  ok: boolean;
}

export default function Enter({}) {
  // email/phone State
  const [method, setMethod] = useState<"email" | "phone">("email");

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue: setMailValue,
  } = useForm<IEnterForm>();
  const {
    register: tkRegister,
    handleSubmit: tkHandleSubmit,
    setValue: setTokenValue,
  } = useForm<ITokenForm>();

  // delete
  setMailValue("email", "123@123.com");
  setTokenValue("token", "082539");

  // POST 유틸리티 (useMt: 대신 API 요청 및 상태/데이터 반환 함수)
  const [mtEnter, { mtloading, mtdata }] =
    useMt<MutationResult>("/api/users/enter");
  const [mtToken, { mtloading: tkLoading, mtdata: tkData }] =
    useMt<MutationResult>("/api/users/token");

  // Fn
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };

  // 로그인시 실행되는 함수
  const onValid = (dataForm: IEnterForm) => {
    if (mtloading) return;
    mtEnter(dataForm);
  };
  // 토큰입력시 실행되는 함수
  const onTokenValid = (dataForm: ITokenForm) => {
    if (tkLoading) return;
    mtToken(dataForm);
  };
  // 토큰인증시 리다이렉트
  const router = useRouter();
  useEffect(() => {
    if (tkData && tkData.ok) {
      router.push("/");
    }
  }, [tkData, router]);

  return (
    <div className="mt-16">
      <Head>
        <title>귤마켓 회원가입 🍊</title>
      </Head>
      <h3 className="text-center text-3xl font-bold">귤마켓 들어오기</h3>
      <div className="mt-12">
        {mtdata?.ok ? (
          // 토큰 입력 폼
          <form
            onSubmit={tkHandleSubmit(onTokenValid)}
            className="mt-8 flex flex-col px-4"
          >
            <label
              htmlFor="input"
              className="text-sm font-medium text-gray-700"
            >
              토큰 인증번호 입력
            </label>
            <div className="mt-1">
              <input
                {...tkRegister("token")}
                id="token"
                name="token"
                type="text"
                className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                required
              />
            </div>
            <button className="focus:ring-off mt-5 rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              {tkLoading ? "인증중" : "토큰 인증"}
            </button>
          </form>
        ) : (
          // 이메일/휴대폰 로그인 폼
          <>
            {/* 선택 Tab */}
            <div className="flex flex-col items-center">
              <h5 className="text-sm font-medium text-gray-500">
                회원이 아니신가요 ?
              </h5>
              <span className="cursor-pointer text-lg font-bold text-gray-600 hover:font-extrabold hover:text-orange-400">
                회원가입
              </span>
              {/* 선택 버튼 */}
              <div className="my-8 grid w-full grid-cols-2 gap-16 border-b">
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "email"
                      ? "border-orange-500   text-orange-500"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onEmailClick}
                >
                  이메일
                </button>
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "phone"
                      ? "border-orange-500   text-orange-500"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onPhoneClick}
                >
                  휴대폰
                </button>
              </div>
            </div>
            {/* Form */}
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-8 flex flex-col px-4"
            >
              <label
                htmlFor="input"
                className="text-sm font-medium text-gray-700"
              >
                {method === "email" ? "이메일" : null}
                {method === "phone" ? "휴대폰" : null}
              </label>
              <div className="mt-1">
                {method === "email" ? (
                  <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="email"
                    className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                    required
                  />
                ) : null}
                {method === "phone" ? (
                  <div className="flex rounded-md shadow-sm">
                    <span className="flex select-none items-center justify-center rounded-l-md border border-r-0 border-gray-300 px-3 text-sm text-gray-500 ">
                      +82
                    </span>
                    <input
                      {...register("phone")}
                      id="phone"
                      name="phone"
                      type="text"
                      className="w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                      required
                    />
                  </div>
                ) : null}
              </div>
              <button className="focus:ring-off mt-5 rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                {method === "email"
                  ? mtloading
                    ? "로딩중"
                    : "이메일로 로그인"
                  : null}
                {method === "phone"
                  ? mtloading
                    ? "로딩중"
                    : "휴대폰번호로 로그인"
                  : null}
              </button>
            </form>
          </>
        )}
        {/* sns 로그인 */}
        <div className="mt-12 px-4">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center">
              <span className="bg-white px-3 text-sm text-gray-500">
                SNS로 계정 로그인하기
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-black">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-black">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-500 shadow-sm hover:bg-gray-50 hover:text-black">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
