import { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/productList";

const Soldlist: NextPage = () => {
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col pt-8">
        <ProductList kind="soldList" />
      </div>
    </Layout>
  );
};

export default Soldlist;
