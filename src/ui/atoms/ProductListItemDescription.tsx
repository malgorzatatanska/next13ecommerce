import { type ProductListItemFragmentFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ProductListItemDescriptionProps = {
	product: ProductListItemFragmentFragment;
};

export const ProductListItemDescription = ({
	product: { name, categories, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-4 flex justify-between">
			<div>
				<h3 className="text-sm text-gray-700">
					<span aria-hidden="true"></span>
					{name}
				</h3>
				<p className="mt-1 text-sm text-gray-500">Black</p>
				<p className="mt-1 text-sm text-gray-500">
					{categories[0].name}
				</p>
			</div>
			<div>
				<p
					className="text-sm font-medium text-gray-900"
					data-testid="product-price"
				>
					{formatMoney(price / 100)}
				</p>
			</div>
		</div>
	);
};
