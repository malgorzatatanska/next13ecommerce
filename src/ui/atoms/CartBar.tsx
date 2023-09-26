import { getCartFromCookies } from "@/api/cart";

export const CartBar = async () => {
	const cart = await getCartFromCookies();
	const quantity = cart?.orderItems.length ?? 0;

	const renderImage = (): JSX.Element => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="h-6 w-6 text-black"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
				/>
			</svg>
		);
	};

	return (
		<div className="flex">
			<>
				<div className="relative  p-2">
					<div>{renderImage()}</div>
					<span className="absolute right-[-10px] top-[-5px] mr-2 text-sm text-pink-600">
						{quantity}
					</span>
				</div>
			</>
		</div>
	);
};
