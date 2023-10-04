import {
	getProductsList,
	getProductsSortByPrice,
} from "@/api/products";
import { SortProduct, type SortTypes } from "@/ui/atoms/SortProduct";
// import { numberOfProductsOnThePage } from "@/ui/consts";
import { ProductList } from "@/ui/organisms/ProductList";

// export const generateStaticParams = async () => {
// 	const products = await getProductsCount();
// 	const pages = Math.ceil(
// 		products / Number(numberOfProductsOnThePage),
// 	);

// 	const pagesList = Array.from({ length: pages }, (_, i) => ({
// 		page: (i + 1).toString(),
// 	}));

// 	return [pagesList];
// };

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: { page: string };
	searchParams: { sort?: SortTypes };
}) {
	const productsList = searchParams.sort
		? await getProductsSortByPrice(searchParams.sort)
		: await getProductsList(params.page);

	return (
		<div className="mx-auto pt-5 text-gray-500">
			<SortProduct />
			<section className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
				<ProductList products={productsList} />
			</section>
		</div>
	);
}
