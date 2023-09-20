import { executeGraphql } from "./graphqlApi";
import {
	type ProductResponseItemType,
	type ProductItemType,
} from "@/ui/types";
import {
	ProductGetListDocument,
	ProductsCountDocument,
} from "@/gql/graphql";

export const getProductById = async (
	id: ProductResponseItemType["id"],
) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products/${id}`,
	);

	const productResponse =
		(await res.json()) as ProductResponseItemType;

	return productResponseItemToProductItemType(productResponse);
};

export const getProductsList = async ({
	take,
	offset,
}: {
	take?: string;
	offset?: string;
}) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`,
	);

	const productsResponse =
		(await res.json()) as ProductResponseItemType[];

	const products = productsResponse.map(
		(product): ProductItemType => {
			return productResponseItemToProductItemType(product);
		},
	);

	return products;
};

export const getProductsListNew = async (pageNumber: string) => {
	const graphqlResonse = await executeGraphql(
		ProductGetListDocument,
		{
			first: 4,
			skip: pageNumber ? (parseInt(pageNumber) - 1) * 4 : 0,
		},
	);

	if (!graphqlResonse.products) {
		return [];
	}

	return graphqlResonse.products;
};

export const getProductsCount = async (): Promise<number> => {
	const productCount = await executeGraphql(
		ProductsCountDocument,
		{},
	);

	return productCount.products?.length || 0;
};

const productResponseItemToProductItemType = (
	productsResponse: ProductResponseItemType,
): ProductItemType => {
	return {
		id: productsResponse.id,
		category: productsResponse.category,
		name: productsResponse.title,
		price: productsResponse.price,
		coverImage: {
			alt: productsResponse.title,
			src: productsResponse.image,
		},
		description: productsResponse.description,
	};
};
