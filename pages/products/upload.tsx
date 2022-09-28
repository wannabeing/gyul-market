import type { NextPage } from "next";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import useMt from "@libs/client/useMt";
import { Product } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface UploadProductForm {
  imgUrl?: string;
  name: string;
  price: number;
  des: string;
}

interface ProductMutationResult {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<UploadProductForm>();
  // API 요청 Hook (상품 업로드 API)
  const [uploadProduct, { mtloading, mtdata }] =
    useMt<ProductMutationResult>("/api/products");

  const router = useRouter();
  useEffect(() => {
    // 상품 생성시, 해당 상품링크로 이동
    if (mtdata?.ok) {
      router.push(`/products/${mtdata.product.id}`);
    }
  }, [mtdata, router]);

  const onValid = (dataForm: UploadProductForm) => {
    if (mtloading) return;

    uploadProduct(dataForm);
    reset();
  };

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-5 py-14">
        {/* 이미지 업로드 */}
        <div>
          <label
            htmlFor="upload"
            className="mb-5 flex h-56 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 transition hover:border-orange-500 hover:text-orange-500"
          >
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input id="upload" className="hidden" type="file" />
          </label>
        </div>
        {/* 상품명 */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            상품명
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            required
          />
        </div>
        {/* 가격 */}
        <div className="mb-5">
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            상품 가격
          </label>
          <div className="relative flex items-center rounded-md shadow-sm">
            {/* 달러표시 */}
            <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
              <span className="text-sm text-gray-700">$</span>
            </div>
            {/* input */}
            <input
              {...register("price", { valueAsNumber: true })}
              id="price"
              type="number"
              placeholder="0.00"
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              required
            />
            {/* 원 표시 */}
            <div className="pointer-events-none absolute right-0 flex items-center pr-3">
              <span className="text-sm text-gray-700">USD</span>
            </div>
          </div>
        </div>
        {/* 설명 */}
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            상품 설명
          </label>
          <textarea
            {...register("des")}
            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            rows={4}
            required
          />
        </div>
        {/* 업로드 버튼 */}
        <button className="focus:ring-off mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          {mtloading ? "등록중" : "상품 등록"}
        </button>
      </form>
    </Layout>
  );
};

export default Upload;
