"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQuantity } from "./actions";

type IncrementProductQuantityProps = {
	quantity: number;
	cartId: string;
};

export const IncrementProductQuantity = ({
	quantity,
	cartId,
}: IncrementProductQuantityProps) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);
	return (
		<form>
			<button
				className="cursor-pointer text-gray-500"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(cartId, optimisticQuantity + 1);
				}}
			>
				+
			</button>
			{optimisticQuantity}
		</form>
	);
};
