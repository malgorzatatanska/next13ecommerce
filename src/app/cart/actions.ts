"use server";

import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";
import { getCartFromCookies } from "@/api/cart";
import { addProductReview, publishReview } from "@/api/reviews";
import { type CommentFormData } from "@/ui/organisms/ReviewForm";

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
		cache: "no-store",
	});

	return productQuantity;
};

export const handlePaymentAction = async () => {
	"use server";
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key env variable");
	}

	const cart = await getCartFromCookies();

	if (!cart) {
		return null;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.orderItems.map((item) => ({
			price_data: {
				currency: "pln",
				product_data: {
					name: item.product?.name || "",
				},
				unit_amount: item.product?.price
					? item.product.price * 100
					: 0,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url:
			"http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "http://localhost:3000/cart/cancel",
	});

	if (!checkoutSession.url) {
		throw new Error("Missing checkout session url");
	}
	cookies().set("cartId", "");
	redirect(checkoutSession.url);
};

export const addReview = async ({
	review,
	productId,
}: {
	review: CommentFormData;
	productId: string;
}) => {
	const { headline, rating, name, email, content } = review;
	const reviewId = await addProductReview({
		review: {
			content: content,
			headline,
			rating: Number(rating),
			name,
			email,
		},
		productId,
	});
	if (reviewId.review?.id) {
		await publishReview(reviewId.review?.id);
	}
};
