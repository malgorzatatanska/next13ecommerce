import { executeGraphql } from "./graphqlApi";
import {
	type ProductResponseItemType,
	type ProductItemType,
} from "@/ui/types";
import {
	GetCategoryProductsCountDocument,
	ProductGetListDocument,
	ProductsCountDocument,
	ProductsGetByCategorySlugDocument,
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

export const getProductsList = async (pageNumber: string) => {
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

export const getProductByCategorySlug = async (
	categorySlug: string,
	page: string,
) => {
	const categories = await executeGraphql(
		ProductsGetByCategorySlugDocument,
		{
			slug: categorySlug,
			first: 4,
			skip: page ? (parseInt(page) - 1) * 4 : 0,
		},
	);

	if (!categories) {
		return [];
	}

	return categories.categories[0].products || [];
};

export const getCategoryProductsCount = async (
	slug: string,
): Promise<number> => {
	const productsCount = await executeGraphql(
		GetCategoryProductsCountDocument,
		{
			slug,
		},
	);
	console.log(productsCount);
	if (!productsCount) {
		return 0;
	}

	return productsCount.categories[0].products?.length || 0;
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
