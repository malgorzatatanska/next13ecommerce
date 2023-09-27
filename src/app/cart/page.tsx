import { redirect } from "next/navigation";

import { handlePaymentAction } from "./actions";
import { getCartFromCookies } from "@/api/cart";
import { ShoppingCartItem } from "@/ui/molecules/ShoppingCartItem";
import { CartSummary } from "@/ui/organisms/CartSummary";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}

	return (
		<div className=" mx-auto flex w-full flex-col  lg:max-w-7xl lg:flex-row ">
			<div className="w-full py-20">
				{cart.orderItems.map((item) => (
					<ShoppingCartItem cartItem={item} key={item.id} />
				))}
			</div>
			<div className="text-s w-full  px-10 py-20 font-semibold leading-6 text-gray-700 lg:w-1/3 ">
				<CartSummary cart={cart} />
				<form action={handlePaymentAction}>
					<button
						type="submit"
						className="mt-10 cursor-pointer rounded-lg bg-pink-600 px-5 py-2 text-center text-sm font-medium text-white"
					>
						Realizacja zamówienia
					</button>
				</form>
			</div>
		</div>
	);
}
