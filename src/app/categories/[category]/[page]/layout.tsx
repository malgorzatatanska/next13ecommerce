import { getCategoryProductsCount } from "@/api/products";
import { Pagination } from "@/ui/organisms/Pagination";

export default async function CategoryPageLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
		category: string;
	};
}) {
	const products = await getCategoryProductsCount(params.category);

	console.log(products, params.category);

	const pages = Array.from(
		{ length: Math.ceil(products / 4) },
		(_, index) => index + 1,
	);
	return (
		<div>
			{children}
			<div className="mx-auto  max-w-2xl flex-col pb-20 ">
				<Pagination
					pages={pages}
					href={`categories/${params.category}`}
				/>
			</div>
		</div>
	);
}
