import { NextResponse, type NextRequest } from "next/server";
import { getProductById, updateProductRating } from "@/api/products";

export async function POST(request: NextRequest): Promise<Response> {
	const json: unknown = await request.json();

	// console.log("hygraph webhook received !!!!");
	// if (!process.env.HYGRAPH_WEBHOOK_SECRET) {
	// 	return NextResponse.json(
	// 		{ message: `No secret key !` },
	// 		{
	// 			status: 401,
	// 		},
	// 	);
	// }

	// const key = request.headers.get("key");
	// if (key !== process.env.HYGRAPH_WEBHOOK_KEY) {
	// 	return NextResponse.json(
	// 		{ message: `No key !` },
	// 		{
	// 			status: 401,
	// 		},
	// 	);
	// }

	if (
		typeof json === "object" &&
		json &&
		"id" in json &&
		typeof json.id === "string" &&
		"rating" in json &&
		typeof json.rating === "number"
	) {
		const product = await getProductById(json.id);
		const newRating = Number(product?.averageRating) + json.rating;

		await updateProductRating(json.id, newRating.toString());

		return NextResponse.json(
			{ message: "Product updated" },
			{ status: 201 },
		);
	}

	return NextResponse.json(
		{ message: `Invalid body !! ` },
		{
			status: 400,
		},
	);
}
