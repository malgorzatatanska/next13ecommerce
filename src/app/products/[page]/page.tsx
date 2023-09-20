import { getProductsCount, getProductsListNew } from "@/api/products";
import { numberOfProductsOnThePage } from "@/ui/consts";
import { ProductList } from "@/ui/organisms/ProductList";

export const generateStaticParams = async () => {
	const products = await getProductsCount();
	const pages = Math.ceil(
		products / Number(numberOfProductsOnThePage),
	);

	const pagesList = Array.from({ length: pages }, (_, i) => ({
		page: (i + 1).toString(),
	}));

	return [pagesList];
};

export default async function ProductsPage({
	params,
}: {
	params: { page: string };
}) {
	const productsList = await getProductsListNew(params.page);

	return (
		<div className="mx-auto text-gray-500">
			<section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<ProductList products={productsList} />
			</section>
		</div>
	);
}
