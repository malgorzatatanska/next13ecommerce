import { getProductsCount } from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";

export default async function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const products = await getProductsCount();

	const pages = Array.from(
		{ length: Math.ceil(products / 4) },
		(_, index) => index + 1,
	);

	return (
		<div>
			{children}
			<div className="mx-auto  max-w-2xl flex-col pb-20">
				<Pagination pages={pages} href="products" />
			</div>
		</div>
	);
}
