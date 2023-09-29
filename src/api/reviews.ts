import { executeGraphql } from "./graphqlApi";
import {
	GetProductBySlugDocument,
	PublishReviewDocument,
	ReviewAddDocument,
	type ReviewFragmentFragment,
} from "@/gql/graphql";

export const getReviewsByProductSlug = async (slug: string) => {
	const reviews = await executeGraphql({
		query: GetProductBySlugDocument,
		variables: {
			slug,
		},
	});

	return reviews;
};

export const addProductReview = ({
	review,
	productId,
}: {
	review: Omit<ReviewFragmentFragment, "id">;
	productId: string;
}) => {
	return executeGraphql({
		query: ReviewAddDocument,
		variables: {
			review: {
				content: review.content,
				rating: review.rating,
				headline: review.headline,
				product: {
					connect: {
						id: productId,
					},
				},
				name: review.name,
				email: review.email,
			},
		},
	});
};

export const publishReview = (reviewId: string) => {
	return executeGraphql({
		query: PublishReviewDocument,
		variables: {
			reviewId,
		},
	});
};
