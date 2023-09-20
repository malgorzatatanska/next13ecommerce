import { notFound } from "next/navigation";
import { getSearchProducts } from "@/api/products";
import { ProductList } from "@/ui/organisms/ProductList";

export default async function SearchPage({
	searchParams,
}: {
	searchParams: { query: string };
}) {
	const getSearchResult = await getSearchProducts(searchParams.query);

	if (!getSearchResult) {
		return notFound();
	}

	if (getSearchResult.length === 0) {
		return (
			<div className="mx-auto max-w-2xl px-4 py-16 text-gray-500 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				No results for phrase: {searchParams.query}
			</div>
		);
	}

	return (
		<section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="text-gray-500">
				Search page {searchParams.query && searchParams.query}
			</div>
			<ProductList products={getSearchResult} />
		</section>
	);
}
