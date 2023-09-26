"use server";

import { executeGraphql } from "@/api/graphqlApi";
import {
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";

export const removeItem = async (itemId: string) => {
	return executeGraphql({
		query: CartRemoveProductDocument,
		variables: { itemId },
		cache: "no-store",
	});
};

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
) => {
	const productQuantity = await executeGraphql({
		query: CartSetProductQuantityDocument,
		variables: {
			itemId,
			quantity,
		},
	});

	return productQuantity;
};
