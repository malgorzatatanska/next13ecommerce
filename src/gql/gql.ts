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
    "mutation CartCreate($email: String!) {\n  createOrder(data: {total: 0, email: $email, stripeCheckoutId: \"\"}) {\n    ...Cart\n  }\n}": types.CartCreateDocument,
    "query CartGetById($id: ID!) {\n  order(where: {id: $id}, stage: DRAFT) {\n    ...Cart\n  }\n}": types.CartGetByIdDocument,
    "fragment Cart on Order {\n  id\n  orderItems {\n    ...CartOrderItemFragment\n  }\n}": types.CartFragmentDoc,
    "fragment CartOrderItemFragment on OrderItem {\n  id\n  quantity\n  total\n  product {\n    id\n    name\n    price\n    slug\n    images(first: 1) {\n      height\n      width\n      url\n    }\n  }\n}": types.CartOrderItemFragmentFragmentDoc,
    "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(where: {id: $itemId}, data: {quantity: $quantity}) {\n    id\n  }\n}": types.CartSetProductQuantityDocument,
    "fragment CollectionFragment on Collection {\n  id\n  slug\n  name\n  image {\n    height\n    width\n    url\n  }\n}": types.CollectionFragmentFragmentDoc,
    "query CollectionGetList {\n  collections {\n    ...CollectionFragment\n  }\n}": types.CollectionGetListDocument,
    "query CollectionGetById($id: ID!) {\n  collection(where: {id: $id}) {\n    name\n    description\n    products {\n      ...ProductListItemFragment\n    }\n  }\n}": types.CollectionGetByIdDocument,
    "query GetCategoryProductsCount($slug: String!) {\n  categories(where: {slug: $slug}) {\n    products {\n      id\n    }\n  }\n}": types.GetCategoryProductsCountDocument,
    "query GetProductBySlug($slug: String!) {\n  product(where: {slug: $slug}) {\n    ...SingleProductFragment\n  }\n}": types.GetProductBySlugDocument,
    "mutation OrderPublish($orderId: ID!) {\n  publishOrder(where: {id: $orderId}) {\n    id\n  }\n}": types.OrderPublishDocument,
    "mutation OrderUpdatePaymentStatus($id: ID!, $paymentStatus: String!) {\n  updateOrder(data: {paymentStatus: $paymentStatus}, where: {id: $id}) {\n    id\n  }\n}": types.OrderUpdatePaymentStatusDocument,
    "mutation OrderUpdateUser($id: ID!, $userId: String!) {\n  updateOrder(data: {userId: $userId}, where: {id: $id}) {\n    id\n  }\n}": types.OrderUpdateUserDocument,
    "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    stage\n    total\n    createdAt\n    paymentStatus\n    orderItems {\n      product {\n        id\n        name\n        images {\n          url\n        }\n      }\n    }\n  }\n}": types.OrdersGetByEmailDocument,
    "query GetProductById($id: ID!) {\n  product(where: {id: $id}) {\n    ...SingleProductFragment\n  }\n}": types.GetProductByIdDocument,
    "query ProductGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItemFragment\n  }\n}": types.ProductGetListDocument,
    "query ProductGetListSortByPrice($sort: ProductOrderByInput!) {\n  products(orderBy: $sort) {\n    ...ProductListItemFragment\n  }\n}": types.ProductGetListSortByPriceDocument,
    "fragment ProductListItemFragment on Product {\n  id\n  name\n  price\n  slug\n  description\n  averageRating\n  categories(first: 1) {\n    name\n    id\n    slug\n  }\n  images(first: 1) {\n    height\n    width\n    url\n  }\n}": types.ProductListItemFragmentFragmentDoc,
    "mutation ProductPublish($productId: ID!) {\n  publishProduct(where: {id: $productId}) {\n    id\n  }\n}": types.ProductPublishDocument,
    "mutation ProductUpdateRating($id: ID!, $rating: String!) {\n  updateProduct(data: {averageRating: $rating}, where: {id: $id}) {\n    id\n  }\n}": types.ProductUpdateRatingDocument,
    "query ProductsCount {\n  products {\n    id\n  }\n}": types.ProductsCountDocument,
    "query ProductsGetByCategorySlug($slug: String!, $first: Int!, $skip: Int!) {\n  categories(where: {slug: $slug}) {\n    products(first: $first, skip: $skip) {\n      ...ProductListItemFragment\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "mutation ReviewAdd($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    stage\n  }\n}": types.ReviewAddDocument,
    "fragment ReviewFragment on Review {\n  id\n  headline\n  content\n  rating\n  name\n  email\n}": types.ReviewFragmentFragmentDoc,
    "query ReviewGetByProductSlug($slug: String!) {\n  reviews(first: 10, where: {product: {slug: $slug}}) {\n    ...ReviewFragment\n  }\n}": types.ReviewGetByProductSlugDocument,
    "mutation PublishReview($reviewId: ID!) {\n  publishReview(where: {id: $reviewId}) {\n    id\n  }\n}": types.PublishReviewDocument,
    "query SearchProducts($name: String!) {\n  products(where: {name_contains: $name}) {\n    ...ProductListItemFragment\n  }\n}": types.SearchProductsDocument,
    "fragment SingleProductFragment on Product {\n  id\n  name\n  price\n  description\n  images {\n    url\n  }\n  categories(first: 1) {\n    name\n    slug\n  }\n  slug\n  collections {\n    id\n    name\n    slug\n  }\n  averageRating\n  reviews(last: 5) {\n    ...ReviewFragment\n  }\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n  }\n}": types.SingleProductFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateOrderItem($quantity: Int!, $total: Int!, $productId: ID!, $orderId: ID!, $currentQuantity: Int!, $currentTotal: Int!, $orderItemId: ID) {\n  upsertOrderItem(\n    upsert: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}, update: {quantity: $currentQuantity, total: $currentTotal, product: {connect: {id: $productId}}, order: {connect: {id: $orderId}}}}\n    where: {id: $orderItemId}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CreateOrderItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate($email: String!) {\n  createOrder(data: {total: 0, email: $email, stripeCheckoutId: \"\"}) {\n    ...Cart\n  }\n}"): typeof import('./graphql').CartCreateDocument;
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
export function graphql(source: "mutation CartRemoveProduct($itemId: ID!) {\n  deleteOrderItem(where: {id: $itemId}) {\n    id\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
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
export function graphql(source: "mutation OrderPublish($orderId: ID!) {\n  publishOrder(where: {id: $orderId}) {\n    id\n  }\n}"): typeof import('./graphql').OrderPublishDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation OrderUpdatePaymentStatus($id: ID!, $paymentStatus: String!) {\n  updateOrder(data: {paymentStatus: $paymentStatus}, where: {id: $id}) {\n    id\n  }\n}"): typeof import('./graphql').OrderUpdatePaymentStatusDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation OrderUpdateUser($id: ID!, $userId: String!) {\n  updateOrder(data: {userId: $userId}, where: {id: $id}) {\n    id\n  }\n}"): typeof import('./graphql').OrderUpdateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrdersGetByEmail($email: String!) {\n  orders(where: {email: $email}) {\n    id\n    stage\n    total\n    createdAt\n    paymentStatus\n    orderItems {\n      product {\n        id\n        name\n        images {\n          url\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').OrdersGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductById($id: ID!) {\n  product(where: {id: $id}) {\n    ...SingleProductFragment\n  }\n}"): typeof import('./graphql').GetProductByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetList($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').ProductGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetListSortByPrice($sort: ProductOrderByInput!) {\n  products(orderBy: $sort) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').ProductGetListSortByPriceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItemFragment on Product {\n  id\n  name\n  price\n  slug\n  description\n  averageRating\n  categories(first: 1) {\n    name\n    id\n    slug\n  }\n  images(first: 1) {\n    height\n    width\n    url\n  }\n}"): typeof import('./graphql').ProductListItemFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ProductPublish($productId: ID!) {\n  publishProduct(where: {id: $productId}) {\n    id\n  }\n}"): typeof import('./graphql').ProductPublishDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ProductUpdateRating($id: ID!, $rating: String!) {\n  updateProduct(data: {averageRating: $rating}, where: {id: $id}) {\n    id\n  }\n}"): typeof import('./graphql').ProductUpdateRatingDocument;
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
export function graphql(source: "mutation ReviewAdd($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    stage\n  }\n}"): typeof import('./graphql').ReviewAddDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ReviewFragment on Review {\n  id\n  headline\n  content\n  rating\n  name\n  email\n}"): typeof import('./graphql').ReviewFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewGetByProductSlug($slug: String!) {\n  reviews(first: 10, where: {product: {slug: $slug}}) {\n    ...ReviewFragment\n  }\n}"): typeof import('./graphql').ReviewGetByProductSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation PublishReview($reviewId: ID!) {\n  publishReview(where: {id: $reviewId}) {\n    id\n  }\n}"): typeof import('./graphql').PublishReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchProducts($name: String!) {\n  products(where: {name_contains: $name}) {\n    ...ProductListItemFragment\n  }\n}"): typeof import('./graphql').SearchProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SingleProductFragment on Product {\n  id\n  name\n  price\n  description\n  images {\n    url\n  }\n  categories(first: 1) {\n    name\n    slug\n  }\n  slug\n  collections {\n    id\n    name\n    slug\n  }\n  averageRating\n  reviews(last: 5) {\n    ...ReviewFragment\n  }\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n  }\n}"): typeof import('./graphql').SingleProductFragmentFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
