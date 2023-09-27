"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { type CommentFormData, ReviewForm } from "./ReviewForm";
import { ProductReview } from "./ProductReview";
import { type SingleProductFragmentFragment } from "@/gql/graphql";
import { addReview } from "@/app/cart/actions";

interface ProductReviewContainerProps {
	reviews: SingleProductFragmentFragment["reviews"];
	productId: string;
}

export const ProductReviewContainer = ({
	reviews,
	productId,
}: ProductReviewContainerProps) => {
	const [optimisticReviews, setOptimisticReviews] =
		useOptimistic(reviews);

	async function handleReviews({
		content,
		headline,
		rating,
		name,
		email,
	}: CommentFormData) {
		setOptimisticReviews((prev) => [
			{
				content,
				headline,
				id: Math.random().toString(),
				rating,
				name,
				email,
			},
			...prev,
		]);

		await addReview({
			review: { content, headline, rating, name, email },
			productId,
		});
	}

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col  gap-10 pb-20 pt-2 ">
			<p className=" text-md border-w w-40 border-b-2 border-indigo-600 pb-4 text-indigo-600">
				Customer reviews
			</p>
			<div className="flex">
				<div className="w-1/2">
					{optimisticReviews.map((review) => {
						return <ProductReview review={review} key={review.id} />;
					})}
				</div>
				<div className="w-1/2 pl-10">
					<ReviewForm handleReviews={handleReviews} />
				</div>
			</div>
		</div>
	);
};
