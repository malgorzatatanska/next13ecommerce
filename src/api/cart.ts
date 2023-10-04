import { cookies } from "next/headers";
import { currentUser } from "@clerk/nextjs";
import { executeGraphql } from "./graphqlApi";
import {
	CartCreateDocument,
	type CartFragment,
	CartGetByIdDocument,
	CreateOrderItemDocument,
	GetProductBySlugDocument,
	OrderPublishDocument,
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

	cookies().set("cartId", cart.createOrder.id, {
		httpOnly: true,
		sameSite: "lax",
		//secure: true -> ciastka dostepne tylko przez https.
	});
	return cart.createOrder;
}

export const publishOrder = async (orderId: string) => {
	return executeGraphql({
		query: OrderPublishDocument,
		variables: {
			orderId,
		},
	});
};

export const getCartFromCookies = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql({
			query: CartGetByIdDocument,
			variables: {
				id: cartId,
			},
			cache: "no-store",
			next: {
				tags: ["cart"],
			},
		});
		if (cart.order) {
			return cart.order;
		}
	}
};

export const createCart = async () => {
	const user = await currentUser();
	const userEmail =
		user?.emailAddresses[0].emailAddress ||
		"malgosiasmieja+admin@gmail.com";

	return executeGraphql({
		query: CartCreateDocument,
		variables: {
			email: userEmail,
		},
		cache: "no-store",
	});
};

export const addToCart = async (
	cart: CartFragment,
	productId: string,
) => {
	const { product } = await executeGraphql({
		query: GetProductBySlugDocument,
		variables: {
			slug: productId,
		},
		cache: "no-store",
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

	await executeGraphql({
		query: CreateOrderItemDocument,
		variables: {
			orderId: cart.id,
			productId: product.id,
			quantity: 1,
			total: product.price,
			currentQuantity: productQuantity + 1,
			currentTotal: product.price * (productQuantity + 1),
			orderItemId: orderItemId?.id,
		},
		cache: "no-store",
	});
};
