/// <reference types="stripe-event-types" />

import { type NextRequest } from "next/server";
import Stripe from "stripe";
import { updatePaymentStatus } from "@/api/orders";

export async function POST(request: NextRequest): Promise<Response> {
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

	let event;

	const signature = request.headers.get("stripe-signature");
	if (!signature) {
		return new Response("No signature", { status: 401 });
	}
	try {
		event = stripe.webhooks.constructEvent(
			await request.text(),
			signature,
			process.env.STRIPE_WEBHOOK_SECRET,
		) as Stripe.DiscriminatedEvent;
	} catch (err) {
		return new Response("Bad webhook key", { status: 401 });
	}

	switch (event.type) {
		case "checkout.session.completed": {
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
