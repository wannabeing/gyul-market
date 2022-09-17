import type { NextPage } from "next";
import FixBtn from "../components/fixBtn";
import Item from "../components/item";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col divide-y-2 pt-3">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            title="IPhone 14 mini"
            price={99}
            id={i}
            comments={4}
            likes={2}
          />
        ))}
        {/* 픽스 버튼 */}
        <FixBtn href="/items/upload">
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
