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
    "mutation CreateOrderItem($quantity: Int!, $total: Int!, $productId: ID!, $orderId: ID!, $currentQuantity: Int!, $currentTotal: Int!, $orderItemId: ID) {\n  upsertOrderItem(\n    upsert: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}, update: {quantity: $currentQuantity, total: $currentTotal, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}}\n    where: {id: $orderItemId}\n  ) {\n    id\n  }\n}": types.CreateOrderItemDocument,
    "mutation CartCreate {\n  createOrder(\n    data: {total: 0, email: \"malgosiasmieja@gmail.com\", stripeCheckoutId: \"000\"}\n  ) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "fragment Cart on Order {\n  id\n  orderItems {\n    ...CartOrderItemFragment\n  }\n}": types.CartFragmentDoc,
    "fragment CartOrderItemFragment on OrderItem {\n  id\n  quantity\n  total\n  product {\n    id\n    name\n    price\n    slug\n    images(first: 1) {\n      height\n      width\n      url\n    }\n  }\n}": types.CartOrderItemFragmentFragmentDoc,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "fragment CollectionFragment on Collection {\n  id\n  slug\n  name\n  image {\n    height\n    width\n    url\n  }\n}": types.CollectionFragmentFragmentDoc,
    "query CollectionGetList {\n  collections {\n    ...CollectionFragment\n  }\n}": types.CollectionGetListDocument,
    "query CollectionGetById($id: ID!) {\n  collection(where: {id: $id}) {\n    name\n    description\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}": types.CollectionGetByIdDocument,
    "query GetCategoryProductsCount($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products {\n      id\n    }\n  }\n}": types.GetCategoryProductsCountDocument,
    "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...SingleProductFragment\n  }\n}": types.GetProductBySlugDocument,
    "query ProductGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItemFragment\n  }\n}": types.ProductGetListDocument,
    "fragment ProductListItemFragment on Product {\n  id\n  name\n  price\n  slug\n  description\n  categories(first: 1) {\n    name\n    id\n    slug\n  }\n  images(first: 1) {\n    height\n    width\n    url\n  }\n}": types.ProductListItemFragmentFragmentDoc,
    "query ProductsCount {\n  products {\n    id\n  }\n}": types.ProductsCountDocument,
    "query ProductsGetByCategorySlug($slug: String!, $first: Int!, $skip: Int!) {\n  categories(where: {slug: $slug}) {\n    products(first: $first, skip: $skip) {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query SearchProducts($name: String!) {\n  products(where: {name_starts_with: $name}) {\n    ...ProductListItemFragment\n  }\n}": types.SearchProductsDocument,
    "fragment SingleProductFragment on Product {\n  id\n  name\n  price\n  description\n  images {\n    url\n  }\n  categories(first: 1) {\n    name\n    slug\n  }\n  slug\n  collections {\n    id\n    name\n    slug\n  }\n  reviews(last: 10) {\n    id\n  }\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n  }\n}": types.SingleProductFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateOrderItem($quantity: Int!, $total: Int!, $productId: ID!, $orderId: ID!, $currentQuantity: Int!, $currentTotal: Int!, $orderItemId: ID) {\n  upsertOrderItem(\n    upsert: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}, update: {quantity: $currentQuantity, total: $currentTotal, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}}\n    where: {id: $orderItemId}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CreateOrderItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(\n    data: {total: 0, email: \"malgosiasmieja@gmail.com\", stripeCheckoutId: \"000\"}\n  ) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Order {\n  id\n  orderItems {\n    ...CartOrderItemFragment\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartOrderItemFragment on OrderItem {\n  id\n  quantity\n  total\n  product {\n    id\n    name\n    price\n    slug\n    images(first: 1) {\n      height\n      width\n      url\n    }\n  }\n}"): typeof import('./graphql').CartOrderItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionFragment on Collection {\n  id\n  slug\n  name\n  image {\n    height\n    width\n    url\n  }\n}"): typeof import('./graphql').CollectionFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetList {\n  collections {\n    ...CollectionFragment\n  }\n}"): typeof import('./graphql').CollectionGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionGetById($id: ID!) {\n  collection(where: {id: $id}) {\n    name\n    description\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}"): typeof import('./graphql').CollectionGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategoryProductsCount($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products {\n      id\n    }\n  }\n}"): typeof import('./graphql').GetCategoryProductsCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...SingleProductFragment\n  }\n}"): typeof import('./graphql').GetProductBySlugDocument;
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchProducts($name: String!) {\n  products(where: {name_starts_with: $name}) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').SearchProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SingleProductFragment on Product {\n  id\n  name\n  price\n  description\n  images {\n    url\n  }\n  categories(first: 1) {\n    name\n    slug\n  }\n  slug\n  collections {\n    id\n    name\n    slug\n  }\n  reviews(last: 10) {\n    id\n  }\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n  }\n}"): typeof import('./graphql').SingleProductFragmentFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
