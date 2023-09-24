import Image from "next/image";
import { type CartOrderItemFragmentFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type ShoppingCartItemProps = {
	cartItem: CartOrderItemFragmentFragment;
};

export const ShoppingCartItem = ({
	cartItem,
}: ShoppingCartItemProps) => {
	if (!cartItem.product) {
		return null;
	}

	return (
		<div className="mx-auto flex max-w-2xl  border-t-2 border-t-gray-200 px-4 py-10  sm:px-6 lg:max-w-7xl lg:px-8 ">
			<div className="w-1/4 ">
				{cartItem.product.images && (
					<Image
						src={cartItem.product?.images[0].url || ""}
						width={160}
						height={90}
						sizes="100vw"
						alt="Test"
					/>
				)}
			</div>
			<div className="flex w-full flex-col  justify-between pl-4 ">
				<div className="mt-2">
					<div className="text-sm font-semibold leading-6 text-gray-500">
						{cartItem.product?.name}
					</div>
					<div className="mt-2 text-sm font-semibold leading-6 text-gray-900">
						{formatMoney(cartItem.product?.price / 100)}
					</div>
				</div>
				<div className="text-sm font-semibold leading-6 text-gray-500 ">
					W magazynie
				</div>
			</div>
			<div className="flex w-1/5 flex-col justify-between">
				<div className="text-sm font-semibold leading-6 text-gray-500">
					Ilosc: {cartItem.quantity}
				</div>
			</div>
		</div>
	);
};
