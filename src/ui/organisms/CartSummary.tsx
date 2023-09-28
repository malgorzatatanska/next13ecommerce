import { type CartFragment } from "@/gql/graphql";
import {
	calculateTotalAmount,
	geTotalQuantity,
	getTotalPrice,
} from "@/utils";

interface CartSummaryProps {
	cart: CartFragment;
}

export const CartSummary = ({ cart }: CartSummaryProps) => {
	return (
		<div>
			Podsumowanie
			<div className=" mt-6 flex justify-between text-sm font-semibold leading-6 text-gray-500">
				<p>Liczba elementów:</p>
				<p> {geTotalQuantity(cart?.orderItems ?? [])}</p>
			</div>
			<div className="mt-1 flex justify-between text-sm font-semibold leading-6 text-gray-500">
				<p>Łączna wartość:</p>
				<p> {cart?.orderItems.reduce(getTotalPrice, 0) / 100}</p>
			</div>
			<div className="mt-1 flex justify-between text-sm font-semibold leading-6 text-gray-900">
				<p>Podatek:</p>
				<p> 23%.</p>
			</div>
			<div className="mt-1 flex justify-between text-sm font-semibold leading-6 text-gray-900">
				<p>Do zapłaty:</p>
				<p>
					{calculateTotalAmount(
						cart.orderItems.reduce(getTotalPrice, 0) / 100,
					)}
				</p>
			</div>
		</div>
	);
};
