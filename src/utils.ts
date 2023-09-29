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
	if (!item.product) {
		throw new Error("Missing product price");
	}
	return total + item.product.price * item.quantity;
};

export const calculateTotalAmount = (totalPrice: number) => {
	return (totalPrice + totalPrice * 0.23).toFixed(2);
};

export const geTotalQuantity = (
	orders: CartOrderItemFragmentFragment[],
) => {
	return orders.reduce((acc, item) => acc + item.quantity, 0);
};
