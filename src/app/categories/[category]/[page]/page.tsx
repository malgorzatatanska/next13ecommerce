import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductByCategorySlug } from "@/api/products";

export const generateMetadata = async ({
	params,
}: {
	params: { category: string; pageNumber: string };
}): Promise<Metadata> => {
	return {
		title: `${
			params.category.charAt(0).toUpperCase() +
			params.category.slice(1)
		}`,
	};
};

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
				<h2>
					{params.category.charAt(0).toUpperCase() +
						params.category.slice(1)}
				</h2>
				<ProductList products={products} />
			</section>
		</div>
	);
}
