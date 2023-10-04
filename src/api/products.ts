import { executeGraphql } from "./graphqlApi";
import { type SortTypes } from "@/ui/atoms/SortProduct";

import {
	CollectionGetByIdDocument,
	CollectionGetListDocument,
	GetCategoryProductsCountDocument,
	GetProductBySlugDocument,
	ProductGetListDocument,
	ProductGetListSortByPriceDocument,
	ProductsCountDocument,
	ProductsGetByCategorySlugDocument,
	SearchProductsDocument,
} from "@/gql/graphql";
export const getProductsList = async (pageNumber: string) => {
	const graphqlResonse = await executeGraphql({
		query: ProductGetListDocument,
		variables: {
			first: 4,
			skip: pageNumber ? (parseInt(pageNumber) - 1) * 4 : 0,
		},
		next: {
			revalidate: 15,
		},
	});

	if (!graphqlResonse.products) {
		return [];
	}

	return graphqlResonse.products;
};

export const getProductsCount = async (): Promise<number> => {
	const productCount = await executeGraphql({
		query: ProductsCountDocument,
		variables: {},
	});

	return productCount.products?.length || 0;
};

export const getProductByCategorySlug = async (
	categorySlug: string,
	page: string,
) => {
	const categories = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug: categorySlug,
			first: 4,
			skip: page ? (parseInt(page) - 1) * 4 : 0,
		},
	});

	if (!categories) {
		return [];
	}

	return categories.categories[0].products || [];
};

export const getCategoryProductsCount = async (
	slug: string,
): Promise<number> => {
	const productsCount = await executeGraphql({
		query: GetCategoryProductsCountDocument,
		variables: {
			slug,
		},
	});
	if (!productsCount) {
		return 0;
	}

	return productsCount.categories[0].products?.length || 0;
};

export const getProductBySlug = async (slug: string) => {
	const product = await executeGraphql({
		query: GetProductBySlugDocument,
		variables: {
			slug,
		},
		next: {
			revalidate: 2,
		},
	});

	if (!product) {
		return null;
	}

	return product.product;
};

export const getCollectionById = async (collectionId: string) => {
	const collection = await executeGraphql({
		query: CollectionGetByIdDocument,
		variables: {
			id: collectionId,
		},
	});

	if (!collection) {
		return null;
	}

	return collection.collection;
};

export const getCollectionList = async () => {
	const collectionsResponse = await executeGraphql({
		query: CollectionGetListDocument,
		variables: {},
	});

	if (!collectionsResponse) {
		return [];
	}

	return collectionsResponse.collections || [];
};

export const getSearchProducts = async (searchValue: string) => {
	const searchResponse = await executeGraphql({
		query: SearchProductsDocument,
		variables: {
			name: searchValue,
		},
	});

	return searchResponse.products;
};

export const getProductsSortByPrice = async (sort: SortTypes) => {
	const products = await executeGraphql({
		query: ProductGetListSortByPriceDocument,
		variables: {
			sort,
		},
	});

	return products.products;
};
