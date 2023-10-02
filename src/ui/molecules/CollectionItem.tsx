import Link from "next/link";
import { type CollectionFragmentFragment } from "@/gql/graphql";

type CollectionListItemProps = {
	collection: CollectionFragmentFragment;
};

export const CollectionItem = ({
	collection,
}: CollectionListItemProps) => {
	return (
		<div className="">
			<Link href={`/collections/${collection.id}`}>
				<div className="bg-gray-10 rounded-lg">
					<img
						className="mb-6 h-40 w-full rounded object-cover object-center"
						src={collection.image?.url || ""}
						alt={collection.name}
					/>

					<h2 className="title-font mb-4 text-lg font-medium text-gray-900">
						{collection.name}
					</h2>
				</div>
			</Link>
		</div>
	);
};
