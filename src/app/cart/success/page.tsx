import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function CartSuccessPage({
	searchParams,
}: {
	searchParams: { sessionId: string };
}) {
	if (!searchParams.sessionId) {
		redirect("/");
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key env variable");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(
		searchParams.sessionId,
	);

	return (
		<div className="mx-auto max-w-lg pb-20 pt-20 text-gray-500">
			<h1 className="mb-10">Dziękuje za zakupy w naszym sklepie !</h1>
			<h2>Twoje zamówienie ma status: {session.payment_status}</h2>
		</div>
	);
}
