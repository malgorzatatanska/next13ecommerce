"use server";

import { executeGraphql } from "@/api/graphqlApi";
import { CartSetProductQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = async (
	itemId: string,
	quantity: number,
) => {
	const productQuantity = await executeGraphql(
		CartSetProductQuantityDocument,
		{
			itemId,
			quantity,
		},
	);

	return productQuantity;
};
