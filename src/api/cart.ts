import { cookies } from "next/headers";
import { executeGraphql } from "./graphqlApi";
import {
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	CreateOrderItemDocument,
	GetProductBySlugDocument,
} from "@/gql/graphql";

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartFromCookies();
	if (existingCart) {
		return existingCart;
	}
	const cart = await createCart();
	if (!cart.createOrder) {
		throw new Error("Could not create cart");
	}
	return cart.createOrder;
}

export const getCartFromCookies = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql(CartGetByIdDocument, {
			id: cartId,
		});
		if (cart.order) {
			return cart.order;
		}
	}
};

export const createCart = async () => {
	return executeGraphql(CartCreateDocument, {});
};

export const addToCart = async (
	cartId: string,
	productId: string,
) => {
	const { product } = await executeGraphql(GetProductBySlugDocument, {
		slug: productId,
	});

	if (!product) {
		throw new Error("Product not found");
	}

	// create to co bylo ale jesli update to?

	await executeGraphql(CreateOrderItemDocument, {
		orderId: cartId,
		productId: product.id,
		quantity: 1,
		total: product.price,
	});
};
