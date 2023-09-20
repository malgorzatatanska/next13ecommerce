import { notFound } from "next/navigation";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductByCategorySlug } from "@/api/products";

export default async function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	const products = await getProductByCategorySlug(
		params.category,
		params.pageNumber,
	);
	if (!products) {
		throw notFound();
	}

	return (
		<div className="mx-auto text-gray-500">
			<section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<ProductList products={products} />
			</section>
		</div>
	);
}
