import { notFound } from "next/navigation";
import { CollectionItem } from "../molecules/CollectionItem";
import { getCollectionList } from "@/api/products";

export const CollectionList = async () => {
	const collections = await getCollectionList();

	if (!collections) {
		return notFound();
	}

	return (
		<ul
			data-testid="collection-list"
			className="md:gri-cols-3 mx-auto mt-6 grid grid-cols-1 content-center justify-center gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8"
		>
			{collections.map((col) => (
				<CollectionItem collection={col} key={col.id} />
			))}
		</ul>
	);
};
