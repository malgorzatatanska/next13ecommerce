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

	// get info from the cookies on the server side.
	// const cartId = cookies().get("cartId")?.value;
	// if (cartId) {
	// 	console.log("cartId from cookie", cartId);
	// 	const cart = await getCartById(cartId);
	// 	if (cart.order) {
	// 		return cart.order;
	// 	}
	// }
	console.log("no cartid in the cookies, creating a new cart");
	const cart = await createCart();
	console.log("created cart", cart);
	if (!cart.createOrder) {
		throw new Error("Could not create cart");
	}
	return cart.createOrder;
}

export const getCartFromCookies = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		console.log("cartId from cookie", cartId);
		const cart = await executeGraphql(CartGetByIdDocument, {
			id: cartId,
		});
		if (cart.order) {
			return cart.order;
		}
	}

	// const cart = await executeGraphql(CartGetByIdDocument, {
	// 	id: cartId,
	// });
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

	await executeGraphql(CreateOrderItemDocument, {
		orderId: cartId,
		productId: product.id,
		quantity: 1,
		total: product.price,
	});
};
