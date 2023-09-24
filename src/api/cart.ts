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

	return undefined;
};

export const createCart = async () => {
	return executeGraphql(CartCreateDocument, {});
};

export const addToCart = async (
	cart: CartFragment,
	productId: string,
) => {
	const { product } = await executeGraphql(GetProductBySlugDocument, {
		slug: productId,
	});

	if (!product) {
		throw new Error("Product not found");
	}

	// count product quantity in cart
	const productQuantity = cart.orderItems?.reduce((acc, item) => {
		if (item.product?.id === product.id) {
			return acc + item.quantity;
		}

		return acc;
	}, 0);

	const orderItemId = cart.orderItems?.find((item) => {
		if (item.product?.id === product.id) {
			return item.id;
		}
	});

	await executeGraphql(CreateOrderItemDocument, {
		orderId: cart.id,
		productId: product.id,
		quantity: 1,
		total: product.price,
		currentQuantity: productQuantity + 1,
		currentTotal: product.price * (productQuantity + 1),
		orderItemId: orderItemId?.id,
	});
};
