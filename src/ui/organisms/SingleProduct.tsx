import Link from "next/link";
import { type Route } from "next";
import { type SingleProductFragmentFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils";

type SingleProductProps = {
	product: SingleProductFragmentFragment;
};

export const SingleProduct = ({ product }: SingleProductProps) => {
	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-10 pb-20 pt-20 lg:flex-row ">
			<div className="relative flex w-full pl-10 sm:w-1/2 sm:max-w-md ">
				<div className="relative h-52 w-52 border-8 border-white lg:h-96 lg:w-96">
					<img
						src={product.images[0].url || ""}
						width="320"
						height="320"
						alt={product.name}
						className="h-full w-full object-cover object-center transition duration-500 hover:scale-110"
					/>
				</div>
			</div>
			<div className="flex w-full flex-col px-10 lg:w-1/2 ">
				<div>
					<h1 className="font py-5 text-5xl font-bold text-gray-900 lg:pt-0 lg:text-6xl">
						{product.name}
					</h1>
					<div className="font pb-5 text-4xl text-gray-600 lg:text-5xl ">
						{formatMoney(product.price)}
					</div>
					<div className="font pb-5 text-2xl leading-snug tracking-wide text-gray-500 lg:text-xl">
						{product.description}
					</div>
					{product.collections &&
						product.collections?.map((col) => {
							return (
								<div
									className="font text-base text-gray-600"
									key={Number(col.id)}
								>
									Collections:
									<Link
										href={`/collection/${col.id}` as Route}
										className="underline"
									>
										{col.name}
									</Link>
								</div>
							);
						})}
				</div>
				<div>
					<div
						data-testid="add-to-cart"
						className="mt-5 inline-block cursor-pointer rounded-md border border-transparent bg-pink-600 px-10 py-3 text-center font-medium text-white hover:bg-pink-700"
					>
						Add to cart
					</div>
				</div>
			</div>
		</div>
	);
};
