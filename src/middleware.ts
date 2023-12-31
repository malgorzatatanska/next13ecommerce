import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
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
		"/api/webhook/productRating",
		new RegExp("/polityka-prywatnosci"),
		new RegExp("/regulamin"),
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// "/categories/(.*)",
// "/collections/(.*)",
// 	"/product/(.*)",
// "/products/(.*)",
