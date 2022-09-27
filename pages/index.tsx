import type { NextPage } from "next";
import FixBtn from "@components/fixBtn";
import Item from "@components/product";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Product } from "@prisma/client";

interface IProducts {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  // 로그인 사용자 정보
  const { user, userLoading } = useUser();
  // swr로 상품 정보 가져오기
  const { data } = useSWR<IProducts>("/api/products");
  console.log(data);

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col divide-y-2 pt-3">
        {data?.products?.map((product) => (
          <Item
            key={product.id}
            title={product.name}
            price={product.price}
            id={product.id}
            comments={4}
            likes={2}
            createdAt={product.created}
          />
        ))}
        {/* 픽스 버튼 */}
        <FixBtn href="/products/upload">
          <svg
            className="h-6 w-6"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FixBtn>
      </div>
    </Layout>
  );
};

export default Home;
