"use client";
import { FaStar } from "react-icons/fa";

interface ProductReviewsListProps {
	review: {
		id: string;
		headline: string;
		content: string;
		rating?: number | null | undefined;
	};
}

export const ProductReview = ({
	review,
}: ProductReviewsListProps) => {
	const isOptimistic = false;

	const stars = Array.from(
		{ length: review.rating ? review.rating : 0 },
		(_, i) => i + 1,
	);

	return (
		<div
			key={review.id}
			className={`mb-4 border-b-2 border-gray-100 ${
				isOptimistic ? "opacity-50" : null
			}`}
		>
			<p className="text-base font-semibold leading-5 tracking-normal text-gray-600">
				{review.headline}
			</p>

			<div className="flex pb-2">
				{stars.map((item, index) => {
					return <FaStar color="#e50a5c" key={index} />;
				})}
			</div>
			<p className="text-gray-500">{review.content}</p>
		</div>
	);
};
