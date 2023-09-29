"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { changeItemQuantity } from "./actions";

type IncrementProductQuantityProps = {
	quantity: number;
	cartItemId: string;
};

export const ChangeProductQuantity = ({
	quantity,
	cartItemId,
}: IncrementProductQuantityProps) => {
	const router = useRouter();
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
					setTimeout(() => {
						router.refresh();
					}, 1000);
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
					setTimeout(() => {
						router.refresh();
					}, 1000);
				}}
			>
				-
			</button>
		</form>
	);
};
