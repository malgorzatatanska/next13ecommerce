/// <reference types="stripe-event-types" />

import { type NextRequest } from "next/server";
import Stripe from "stripe";
import { updatePaymentStatus } from "@/api/orders";

export async function POST(request: NextRequest): Promise<Response> {
	console.log("Stripe webhook received !!!!");
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key env variable");
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw new Error("Missing Stripe STRIPE_WEBHOOK_SECRET");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const signature = request.headers.get("stripe-signature");
	if (!signature) {
		return new Response("No signature", { status: 401 });
	}

	const event = stripe.webhooks.constructEvent(
		await request.text(),
		signature,
		process.env.STRIPE_WEBHOOK_SECRET,
	) as Stripe.DiscriminatedEvent;

	switch (event.type) {
		case "checkout.session.completed": {
			console.log("Payment completed");
			// change the order status to paid
			const orderId = event.data.object.metadata?.cartId;
			if (!orderId) {
				return new Response(null, { status: 400 });
			}
			await updatePaymentStatus(
				orderId,
				event.data.object.payment_status,
			);
		}
		case "checkout.session.async_payment_succeeded": {
			//change the order status to paid
			const orderId = event.data.object.metadata?.cartId;
			if (!orderId) {
				return new Response(null, { status: 400 });
			}
			await updatePaymentStatus(
				orderId,
				event.data.object.payment_status,
			);
		}
		case "checkout.session.async_payment_failed": {
			//change the order status to failed
			console.log("Payment failed");
			const orderId = event.data.object.metadata?.cartId;
			if (!orderId) {
				return new Response(null, { status: 400 });
			}
			await updatePaymentStatus(
				orderId,
				event.data.object.payment_status,
			);
		}
		case "checkout.session.expired": {
			const orderId = event.data.object.metadata?.cartId;
			if (!orderId) {
				return new Response(null, { status: 400 });
			}
			await updatePaymentStatus(
				orderId,
				event.data.object.payment_status,
			);
		}
	}

	return new Response(null, { status: 204 });
}
