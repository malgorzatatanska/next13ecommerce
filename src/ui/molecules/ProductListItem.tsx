import Link from "next/link";
import { ProductCoverImage } from "@/ui/atoms/ProductCoverImage";
import { ProductListItemDescription } from "@/ui/atoms/ProductListItemDescription";
import { type ProductListItemFragmentFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductListItem = ({
	product,
}: ProductListItemProps) => {
	return (
		<li>
			<Link href={`/product/${product.id}`}>
				<article>
					<ProductCoverImage
						alt={product.name}
						src={product.images[0].url}
					/>
					<ProductListItemDescription product={product} />
				</article>
			</Link>
		</li>
	);
};
