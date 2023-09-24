import { executeGraphql } from "./graphqlApi";

import {
	CollectionGetByIdDocument,
	CollectionGetListDocument,
	GetCategoryProductsCountDocument,
	GetProductBySlugDocument,
	ProductGetListDocument,
	ProductsCountDocument,
	ProductsGetByCategorySlugDocument,
	SearchProductsDocument,
} from "@/gql/graphql";
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
	if (!productsCount) {
		return 0;
	}

	return productsCount.categories[0].products?.length || 0;
};

export const getProductBySlug = async (slug: string) => {
	const product = await executeGraphql(GetProductBySlugDocument, {
		slug,
	});

	if (!product) {
		return null;
	}

	return product.product;
};

export const getCollectionById = async (collectionId: string) => {
	const collection = await executeGraphql(CollectionGetByIdDocument, {
		id: collectionId,
	});

	if (!collection) {
		return null;
	}

	return collection.collection;
};

export const getCollectionList = async () => {
	const collectionsResponse = await executeGraphql(
		CollectionGetListDocument,
		{},
	);

	if (!collectionsResponse) {
		return [];
	}

	return collectionsResponse.collections || [];
};

export const getSearchProducts = async (searchValue: string) => {
	const searchResponse = await executeGraphql(
		SearchProductsDocument,
		{
			name: searchValue,
		},
	);

	return searchResponse.products;
};
