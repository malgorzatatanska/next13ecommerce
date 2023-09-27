import Image from "next/image";
import Link from "next/link";
import { Delete } from "../atoms/DeleteButton";
import { type CartOrderItemFragmentFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";
import { ChangeProductQuantity } from "@/app/cart/ChangeProductQuantity";

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
				<Link href={`/product/${cartItem.product.slug}`}>
					{cartItem.product.images && (
						<Image
							src={cartItem.product?.images[0].url || ""}
							width={160}
							height={90}
							sizes="100vw"
							alt="Test"
						/>
					)}
				</Link>
			</div>
			<Link href={`/product/${cartItem.product.slug}`}>
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
			</Link>
			<div className="flex w-full flex-row justify-between  ">
				<div className=" flex w-full  justify-center gap-3 bg-center text-center text-sm font-semibold leading-6 text-gray-500">
					<ChangeProductQuantity
						quantity={cartItem.quantity}
						cartItemId={cartItem.id}
					/>
				</div>
				<div className="flex  text-gray-500">
					<Delete itemId={cartItem.id} />
				</div>
			</div>
		</div>
	);
};
