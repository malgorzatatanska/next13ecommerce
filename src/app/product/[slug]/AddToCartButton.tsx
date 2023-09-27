"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	// info about the form status on the server side.
	const formStatus = useFormStatus();
	return (
		<button
			data-testid="add-to-cart-button"
			disabled={formStatus.pending}
			className="mt-5 inline-block cursor-pointer rounded-md border border-transparent bg-pink-600 px-10 py-3 text-center font-medium text-white hover:bg-pink-700 disabled:cursor-wait disabled:bg-gray-400"
		>
			Add to cart
		</button>
	);
};
