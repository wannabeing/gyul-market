import { NextPage } from "next";
import Item from "../../components/item";
import Layout from "../../components/layout";

const BuyList: NextPage = () => {
  return (
    <Layout canGoBack title="구매내역">
      <div className="flex flex-col pt-8">
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
      </div>
    </Layout>
  );
};

export default BuyList;
