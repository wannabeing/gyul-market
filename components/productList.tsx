import { ProductWithCount } from "pages";
import useSWR from "swr";
import LoadingList from "./loadingList";
import Item from "./product";

interface IProduct {
  id: number;
  product: ProductWithCount;
}
interface ProductListResponse {
  [key: string]: IProduct[];
}
interface IListKind {
  kind: "favList" | "soldList" | "buyList";
}
export default function ProductList({ kind }: IListKind) {
  const { data } = useSWR<ProductListResponse>(`/api/users/whoLogin/${kind}`);

  return data ? (
    <>
      {data[kind].map((item) => (
        <Item
          key={item.id}
          id={item.product.id}
          title={item.product.name}
          price={item.product.price}
          imgUrl={item.product.imgUrl}
          likes={item.product._count.favLists}
          createdAt={item.product.created}
        />
      ))}
    </>
  ) : (
    <LoadingList />
  );
}
