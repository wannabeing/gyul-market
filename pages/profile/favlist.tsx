import { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/productList";

const Favlist: NextPage = () => {
  return (
    <Layout canGoBack title="관심목록" pageTitle="관심목록">
      <div className="flex flex-col pt-8">
        <ProductList kind="favList" />
      </div>
    </Layout>
  );
};

export default Favlist;
