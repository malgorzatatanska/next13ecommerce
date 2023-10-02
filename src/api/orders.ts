import { executeGraphql } from "./graphqlApi";
import {
	OrderUpdatePaymentStatusDocument,
	OrderUpdateUserDocument,
	OrdersGetByEmailDocument,
} from "@/gql/graphql";

export const OrdersGetByEmail = async (email: string) => {
	const orders = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: {
			email,
		},
	});

	if (!orders) {
		return [];
	}

	return orders.orders;
};

export const updateOrdersUser = async (
	orderId: string,
	userId: string,
) => {
	return executeGraphql({
		query: OrderUpdateUserDocument,
		variables: {
			id: orderId,
			userId,
		},
	});
};

export const updatePaymentStatus = async (
	orderId: string,
	paymentStatus: string,
) => {
	return executeGraphql({
		query: OrderUpdatePaymentStatusDocument,
		variables: {
			id: orderId,
			paymentStatus,
		},
	});
};
