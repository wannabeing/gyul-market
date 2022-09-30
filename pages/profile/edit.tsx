import { NextPage } from "next";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { cls, getImgSrc } from "@libs/client/utils";
import useMt from "@libs/client/useMt";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";

interface EditForm {
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: FileList;
  formError?: string;
}
interface EditResponse {
  ok: boolean;
  replace?: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  // 리액트 훅 폼
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditForm>();

  // 프로필 수정 API 요청 (POST)
  const [editProfile, { mtdata, mtloading }] =
    useMt<EditResponse>("/api/users/edit");

  // 폼 제출 함수
  const onValid = async (dataForm: EditForm) => {
    // 이미 요청중일 경우 기다리게 함
    if (mtloading) return;

    // 로그인 유저가 프로필이미지를 변경했다면
    if (dataForm.avatarUrl && dataForm.avatarUrl.length === 1 && user) {
      // (GET), CloudFlare 업로드 URL 요청 빈 업로드URL을 받음
      const cloudflareReq = await (await fetch(`/api/imgfile`)).json();

      // (POST), 받은 업로드 URL에 이미지파일 업로드
      // avatarUrlId: cloudflare에 올린 이미지의 id
      const form = new FormData();
      form.append("file", dataForm.avatarUrl[0], user.id + "");
      const {
        result: { id: avatarUrlId },
      } = await (
        await fetch(cloudflareReq.uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      // // API 요청 (/api/users/edit)
      editProfile({
        ...dataForm,
        avatarUrlId,
      });
    } else {
      // // API 요청 (/api/users/edit)
      editProfile(dataForm);
    }
  };

  // 폼에 DB 로그인 유저의 정보 set
  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
    }
    if (user?.email) {
      setValue("email", user.email);
    }
    if (user?.phone) {
      setValue("phone", user.phone);
    }
    if (user?.avatarUrl) {
      setAvatarPreviewURL(getImgSrc(user.avatarUrl, "avatar"));
    }
  }, [user, setValue]);
  // API 응답에서 에러메시지가 발견되면 에러메시지 폼에 출력
  useEffect(() => {
    if (mtdata && !mtdata.ok && mtdata.error) {
      return setError("formError", {
        message: mtdata.error,
      });
    }
  }, [mtdata, setError]);
  // API 응답이 성공적으로 마치면 프로필 홈으로 이동
  useEffect(() => {
    if (mtdata?.ok === true && mtdata?.replace === true) {
      router.push(`/profile`);
    }
  }, [mtdata, router]);

  // 프로필 업로드 미리보기
  const watchAvatarURL = watch("avatarUrl");
  const [avatarPreviewURL, setAvatarPreviewURL] = useState("");
  useEffect(() => {
    if (watchAvatarURL && watchAvatarURL.length === 1) {
      const avatarBrowserFile = watchAvatarURL[0];
      // 브라우저 메모리에 있는 URL을 변수에 저장
      setAvatarPreviewURL(URL.createObjectURL(avatarBrowserFile));
    }
  }, [watchAvatarURL]);

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 px-5 py-14">
        {/* 프로필 이미지 수정 */}
        <div className="flex flex-col items-center justify-center space-y-3 space-x-3">
          {/* 업로드 프로필 미리보기 */}
          {avatarPreviewURL ? (
            <Image
              width={56}
              height={56}
              src={avatarPreviewURL}
              className="rounded-full bg-gray-500"
              alt="avatar"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-gray-500" />
          )}
          <label
            htmlFor="avatarUrl"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-xs font-medium text-gray-700 shadow-sm hover:border-orange-500 hover:bg-orange-400 hover:text-white focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            프로필 이미지 변경
            <input
              {...register("avatarUrl")}
              accept="image/*"
              id="avatarUrl"
              type="file"
              className="hidden"
            />
          </label>
        </div>
        {/* 이름 수정 */}
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="cursor-pointer text-sm font-medium text-gray-700"
          >
            이름
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            required
            className={cls(
              errors.formError ? "border-red-500" : "",
              "w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            )}
          />
        </div>
        {/* 휴대폰 수정 */}
        {user?.email === null ? (
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
                {...register("phone")}
                id="input"
                type="text"
                required
                className={cls(
                  errors.formError ? "border-red-500" : "",
                  "w-full appearance-none rounded-md rounded-l-none border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                )}
              />
            </div>
          </div>
        ) : null}
        {/* 이메일 수정 */}
        {user?.phone === null ? (
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="cursor-pointer text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              required
              className={cls(
                errors.formError ? "border-red-500" : "",
                "w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              )}
            />
          </div>
        ) : null}

        {/* 오류 메시지 */}
        {errors.formError ? (
          <span className="mt-2 flex justify-center text-sm font-bold text-red-500">
            {errors.formError.message}
          </span>
        ) : null}
        {/* 수정 버튼 */}
        <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          {mtloading ? "수정중" : "수정하기"}
        </button>
      </form>
    </Layout>
  );
};

export default EditProfile;
