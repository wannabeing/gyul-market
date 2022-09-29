import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Product, User } from "@prisma/client";
import useMt from "@libs/client/useMt";
import { cls } from "@libs/client/utils";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isFavProduct: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // 상품 정보 swr로 가져오기 (GET)
  const { data, mutate } = useSWR<ItemResponse>(
    router.query ? `/api/products/${router.query.id}` : null
  );
  // 상품 정보 가져오기 전까지 로딩구현
  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    // 없는 상품으로 접속 시, replace
    if (data && !data.ok) {
      router.replace("/");
    }
  }, [data, router]);

  // API 요청 (관심목록 생성 및 삭제, POST)
  const [cdFavList] = useMt(`/api/products/${router.query.id}/fav`);
  // 관심 버튼 클릭 함수
  const onFavClicked = () => {
    if (!data) return;
    mutate({ ...data, isFavProduct: !data.isFavProduct }, false);
    cdFavList({});
  };

  return (
    <Layout canGoBack>
      <div className="px-5 pt-10">
        {/* API 로딩 중 */}
        {loading ? (
          <div className="mb-5 border-b pb-5">
            {/* 상품 상세 이미지 */}
            <div className="h-96 rounded-md bg-gray-300" />
            {/* 유저 프로필 */}
            <div>
              <div className="flex items-center space-x-3 border-b py-5 transition hover:text-orange-500">
                {/* 프로필사진 */}
                <div className="h-12 w-12 rounded-full bg-gray-300" />
                <div className="rounded-md bg-gray-200 p-5 px-20 text-sm font-medium" />
              </div>
            </div>
            {/* 상품 설명 */}
            <div className="mt-5">
              <div className="rounded-md bg-gray-200 p-5 text-3xl font-bold text-gray-700" />
              <div className="my-3 block rounded-md bg-gray-200 p-5 text-right text-3xl text-gray-700" />
              <div className="mb-3 rounded-md bg-gray-200 p-5 text-base text-gray-800" />
              <div className="flex items-center justify-between space-x-2">
                <button className="focus:ring-off flex-1 rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  Talk to seller
                </button>
                <button className="flex items-center justify-center rounded-md p-3 text-gray-400">
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
        ) : (
          // ❌ 로딩 끝 ❌
          <div className="mb-5 border-b pb-5">
            {/* 상품 상세 이미지 */}
            {data?.product.imgUrl ? (
              <div className="flex items-center justify-center">
                <img
                  className="flex h-96 justify-center rounded-md"
                  src={`https://imagedelivery.net/wcUPAZAvdexBQSNKKQ-Z8Q/${data?.product.imgUrl}/public`}
                />
              </div>
            ) : (
              <div className="h-96 rounded-md bg-gray-300" />
            )}
            {/* 유저 프로필 */}
            <Link href={`/profiles/${data?.product?.user?.name}`}>
              <a className="flex cursor-pointer items-center space-x-3 border-b py-5 transition hover:text-orange-500">
                {/* 프로필사진 */}
                {data?.product?.user?.avatarUrl ? (
                  <div className="h-12 w-12 rounded-full bg-orange-300" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-300" />
                )}
                <div>
                  <p className="text-sm font-medium">
                    {data?.product?.user?.name}
                  </p>
                </div>
              </a>
            </Link>
            {/* 상품 설명 */}
            <div className="mt-5">
              <h1 className="text-3xl font-bold text-gray-700">
                {data?.product?.name}
              </h1>
              <p className="my-3 block text-right text-3xl text-gray-700">
                ${data?.product?.price.toLocaleString("en")}
              </p>
              <p className="mb-3 text-base text-gray-800">
                {data?.product?.des}
              </p>
              <div className="flex items-center justify-between space-x-2">
                <button className="focus:ring-off flex-1 rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  Talk to seller
                </button>
                {/* 관심목록 추가 버튼 */}
                <button
                  onClick={onFavClicked}
                  className={cls(
                    "flex items-center justify-center rounded-md p-3 ",
                    data?.isFavProduct
                      ? "text-red-600"
                      : "text-gray-400 hover:text-red-600"
                  )}
                >
                  {data?.isFavProduct ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
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
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* 비슷한 상품들 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-700">
            비슷한 상품 or 스티브님의 다른 상품
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {data?.relatedProducts?.map((product) => (
              <div key={product.id} className="mb-5 cursor-pointer">
                <Link href={`/products/${product.id}`}>
                  <a>
                    <div className="mb-3 h-48 rounded-md bg-gray-400 transition hover:bg-gray-700" />
                    <h3 className="-mb-1 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-700">
                      ${product.price.toLocaleString("en")}
                    </span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
