/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetCategoryProductsCount($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products {\n      id\n    }\n  }\n}": types.GetCategoryProductsCountDocument,
    "query ProductGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItemFragment\n  }\n}": types.ProductGetListDocument,
    "fragment ProductListItemFragment on Product {\n  id\n  name\n  price\n  slug\n  description\n  categories(first: 1) {\n    name\n    id\n    slug\n  }\n  images(first: 1) {\n    height\n    width\n    url\n  }\n}": types.ProductListItemFragmentFragmentDoc,
    "query ProductsCount {\n  products {\n    id\n  }\n}": types.ProductsCountDocument,
    "query ProductsGetByCategorySlug($slug: String!, $first: Int!, $skip: Int!) {\n  categories(where: {slug: $slug}) {\n    products(first: $first, skip: $skip) {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategoryProductsCount($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products {\n      id\n    }\n  }\n}"): typeof import('./graphql').GetCategoryProductsCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').ProductGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItemFragment on Product {\n  id\n  name\n  price\n  slug\n  description\n  categories(first: 1) {\n    name\n    id\n    slug\n  }\n  images(first: 1) {\n    height\n    width\n    url\n  }\n}"): typeof import('./graphql').ProductListItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsCount {\n  products {\n    id\n  }\n}"): typeof import('./graphql').ProductsCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!, $first: Int!, $skip: Int!) {\n  categories(where: {slug: $slug}) {\n    products(first: $first, skip: $skip) {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
