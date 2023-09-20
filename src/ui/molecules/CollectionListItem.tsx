import Link from "next/link";
import { type ProductListItemFragmentFragment } from "@/gql/graphql";

type CollectionListItemProps = {
	product: ProductListItemFragmentFragment;
};

export const CollectionListItem = ({
	product,
}: CollectionListItemProps) => {
	return (
		<div className="p-4 md:w-1/2 xl:w-1/4">
			<div className="rounded-lg bg-gray-100 p-6">
				<Link href={`/product/${product.slug}`}>
					<img
						className="mb-6 h-40 w-full rounded object-cover object-center"
						src={product.images[0].url || ""}
						alt={product.name}
					/>

					<h2 className="title-font mb-4 text-lg font-medium text-gray-900">
						{product.name}
					</h2>
				</Link>
			</div>
		</div>
	);
};
