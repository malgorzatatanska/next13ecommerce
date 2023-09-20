import { ProductList } from "./ProductList";
import { getProductsList } from "@/api/products";

export const SuggestedProductsList = async () => {
	const products = await getProductsList("1");

	return <ProductList products={products} />;
};
