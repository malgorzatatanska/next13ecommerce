"use server";

import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { executeGraphql } from "@/api/graphqlApi";
import {
	CartRemoveProductDocument,
	CartSetProductQuantityDocument,
} from "@/gql/graphql";
import { getCartFromCookies, publishOrder } from "@/api/cart";
import { addProductReview, publishReview } from "@/api/reviews";
import { type CommentFormData } from "@/ui/organisms/ReviewForm";
import { updateOrdersUser } from "@/api/orders";

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

	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

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
					images: item.product?.images[0].url
						? [item.product.images[0].url]
						: [],
				},
				unit_amount: item.product?.price
					? item.product.price * 100
					: 0,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url: `${process.env.PAGE_URL}cart/success?sessionId={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.PAGE_URL}cart/cancel`,
	});

	await publishOrder(cart.id);
	await updateOrdersUser(cart.id, user.id);
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
