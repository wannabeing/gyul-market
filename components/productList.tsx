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
          title={item.product.name}
          price={item.product.price}
          id={item.product.id}
          likes={item.product._count.favLists}
          createdAt={item.product.created}
        />
      ))}
    </>
  ) : (
    <LoadingList />
  );
}
