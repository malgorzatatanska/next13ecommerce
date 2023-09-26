import { redirect } from "next/navigation";
import { getCartFromCookies } from "@/api/cart";
import { ShoppingCartItem } from "@/ui/molecules/ShoppingCartItem";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function CartPage() {
	console.log("CART PAGE");
	const cart = await getCartFromCookies();
	console.log("CART - CART PAGE", cart);

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
