import { ProductList } from "./ProductList";
import { getProductByCategorySlug } from "@/api/products";

type SuggestedProductsProps = {
	categorySlug: string;
};

export const SuggestedProductsList = async ({
	categorySlug,
}: SuggestedProductsProps) => {
	const products = await getProductByCategorySlug(categorySlug, "1");

	return (
		<div data-testid="related-products">
			<ProductList products={products} />
		</div>
	);
};
