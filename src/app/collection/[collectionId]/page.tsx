import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getCollectionById } from "@/api/products";
import { Collection } from "@/ui/organisms/Collection";

export const generateMetadata = async ({
	params,
}: {
	params: { collectionId: string };
}): Promise<Metadata> => {
	const collection = await getCollectionById(params.collectionId);

	if (!collection) {
		throw new Error("Product not found");
	}

	return {
		title: `${collection.name}`,
		description: `${collection.description}`,
		openGraph: {
			title: `${collection.name}`,
			description: `${collection.description}`,
		},
	};
};

export default async function CollectionsPage({
	params,
}: {
	params: { collectionId: string };
}) {
	const collection = await getCollectionById(params.collectionId);

	if (!collection) {
		return notFound();
	}
	return (
		<div className="mx-auto text-gray-500">
			<Collection
				name={collection.name}
				description={collection?.description || ""}
				products={collection.products || []}
			/>
		</div>
	);
}
