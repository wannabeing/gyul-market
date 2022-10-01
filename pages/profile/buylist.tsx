import { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/productList";

const Buylist: NextPage = () => {
  return (
    <Layout canGoBack title="구매내역" pageTitle="구매내역">
      <div className="flex flex-col pt-8">
        <ProductList kind="buyList" />
      </div>
    </Layout>
  );
};

export default Buylist;
