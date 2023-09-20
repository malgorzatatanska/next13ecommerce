import { type ProductListItemFragmentFragment } from "@/gql/graphql";
import { ProductListItem } from "@/ui/molecules/ProductListItem";

type ProductListProps = {
	products: ProductListItemFragmentFragment[];
};

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<ul
			data-testid="products-list"
			className="md:gri-cols-3 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
		>
			{products.map((product) => (
				<ProductListItem product={product} key={product.id} />
			))}
		</ul>
	);
};
