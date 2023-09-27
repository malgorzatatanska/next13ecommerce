"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";

type IncrementProductQuantityProps = {
	quantity: number;
	cartItemId: string;
};

export const ChangeProductQuantity = ({
	quantity,
	cartItemId,
}: IncrementProductQuantityProps) => {
	const [optimisticQuantity, setOptimisticQuantity] =
		useOptimistic(quantity);

	return (
		<form className="row flex items-center justify-center">
			<button
				data-testid="increment"
				className="w-10 cursor-pointer text-2xl text-gray-500"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(
						cartItemId,
						optimisticQuantity + 1,
					);
				}}
			>
				+
			</button>
			<div className="text-3xl"> {optimisticQuantity}</div>
			<button
				data-testid="decrement"
				className="w-10 cursor-pointer text-xl text-gray-500"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(
						cartItemId,
						optimisticQuantity - 1,
					);
				}}
			>
				-
			</button>
		</form>
	);
};
