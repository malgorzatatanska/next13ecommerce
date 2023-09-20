import { executeGraphql } from "./graphqlApi";

import {
	CollectionGetByIdDocument,
	GetCategoryProductsCountDocument,
	GetProductBySlugDocument,
	ProductGetListDocument,
	ProductsCountDocument,
	ProductsGetByCategorySlugDocument,
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
	console.log(productsCount);
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

	console.log(collection);

	if (!collection) {
		return null;
	}

	return collection.collection;
};

// const productResponseItemToProductItemType = (
// 	productsResponse: ProductResponseItemType,
// ): ProductItemType => {
// 	return {
// 		id: productsResponse.id,
// 		category: productsResponse.category,
// 		name: productsResponse.title,
// 		price: productsResponse.price,
// 		coverImage: {
// 			alt: productsResponse.title,
// 			src: productsResponse.image,
// 		},
// 		description: productsResponse.description,
// 	};
// };
