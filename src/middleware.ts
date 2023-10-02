import { authMiddleware } from "@clerk/nextjs";

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// eslint-disable-next-line import/no-default-export
export default authMiddleware({
	publicRoutes: [
		"/",
		"/search",
		"/cart",
		new RegExp("/categories/(.*)"),
		new RegExp("/collections/(.*)"),
		new RegExp("/product/(.*)"),
		new RegExp("/products/(.*)"),
		"/cart/success",
		"/api/webhook/stripe",
		new RegExp("/polityka-prywatnosci"),
		new RegExp("/regulamin"),
		new RegExp("/_not-found"),
	],
});
