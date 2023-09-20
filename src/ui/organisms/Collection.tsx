import { CollectionListItem } from "../molecules/CollectionListItem";
import { type ProductListItemFragmentFragment } from "@/gql/graphql";

type CollectionProps = {
	name: string;
	description?: string | null;
	products?: ProductListItemFragmentFragment[];
};

export const Collection = ({
	name,
	description,
	products,
}: CollectionProps) => {
	return (
		<section className="body-font text-gray-600">
			<div className="container mx-auto px-5 py-24">
				<div className="mb-20 flex w-full flex-wrap">
					<div className="mb-6 w-full lg:mb-0 lg:w-1/2">
						<h1 className="title-font mb-2 text-2xl font-medium text-gray-900 sm:text-3xl">
							{name}
						</h1>
						<div className="h-1 w-20 rounded bg-indigo-500"></div>
					</div>
					<p className="w-full leading-relaxed text-gray-500 lg:w-1/2">
						{description || ""}
					</p>
				</div>
				<div className="-m-4 flex flex-wrap">
					{products &&
						products.map((product) => {
							return (
								<CollectionListItem
									key={product.id}
									product={product}
								/>
							);
						})}
				</div>
			</div>
		</section>
	);
};
