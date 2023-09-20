import { notFound } from "next/navigation";
import { getCollectionById } from "@/api/products";
import { Collection } from "@/ui/organisms/Collection";

export default async function CollectionsPage({
	params,
}: {
	params: { collectionId: string };
}) {
	const collection = await getCollectionById(params.collectionId);

	console.log(collection);

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
