import { type CartOrderItemFragmentFragment } from "./gql/graphql";

export const formatMoney = (amount: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
};

export const getTotalPrice = (
	total: number,
	item: CartOrderItemFragmentFragment,
): number => {
	return total + (item.product?.price ?? 0 * item.quantity);
};

export const calculateTotalAmount = (totalPrice: number) => {
	return (totalPrice + totalPrice * 0.23).toFixed(2);
};
