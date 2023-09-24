import { redirect } from "next/navigation";
import { getCartFromCookies } from "@/api/cart";
import { ShoppingCartItem } from "@/ui/molecules/ShoppingCartItem";

export default async function CartPage() {
	const cart = await getCartFromCookies();

	if (!cart) {
		redirect("/");
	}
	return (
		<div className=" mx-auto max-w-2xl lg:flex-row ">
			<div className="w-full py-20">
				{cart.orderItems.map((item) => (
					<ShoppingCartItem cartItem={item} key={item.id} />
				))}
			</div>
			<div className="text-s w-full  px-10 py-20 font-semibold leading-6 text-gray-700 lg:w-1/3 ">
				{/* <CartSummary /> */}
			</div>
		</div>
	);
}
