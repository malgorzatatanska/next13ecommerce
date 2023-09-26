import { Suspense } from "react";
// import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/api/products";
// import { SuggestedProductsList } from "@/ui/organisms/SuggestedProducts";
import { SingleProduct } from "@/ui/organisms/SingleProduct";

// export const generateStaticParams = async () => {
// 	const products = await getProductsList();
// 	const productsIdsList = products.map((product) => ({
// 		productId: product.id,
// 	}));
// 	return productsIdsList.slice(0, 2);
// };

// export const generateMetadata = async ({
// 	params,
// }: {
// 	params: { slug: string };
// }): Promise<Metadata> => {
// 	const product = await getProductBySlug(params.slug);

// 	return {
// 		title: `${product?.name}`,
// 		description: `${product?.description}`,
// 		openGraph: {
// 			title: `${product?.name}`,
// 			description: `${product?.description}`,
// 			images: [{ url: `${product?.images[0].url}` }],
// 		},
// 	};
// };

export default async function Product({
	params,
}: {
	params: { slug: string };
}) {
	const product = await getProductBySlug(params.slug);

	if (!product) {
		return notFound();
	}

	return (
		<>
			<div>
				<SingleProduct product={product} />
			</div>
			<aside>
				<Suspense fallback="Loading ...">
					{/* <div className="mx-auto max-w-2xl">
						<SuggestedProductsList
							categorySlug={product.categories[0].slug}
						/>
					</div> */}
				</Suspense>
			</aside>
		</>
	);
}
