import { NextResponse, type NextRequest } from "next/server";
import { getProductById, updateProductRating } from "@/api/products";

export async function POST(request: NextRequest): Promise<Response> {
	const json: unknown = await request.json();

	if (!process.env.HYGRAPH_WEBHOOK_SECRET) {
		return NextResponse.json(
			{ message: `No secret key !` },
			{
				status: 401,
			},
		);
	}

	const key = request.headers.get("key");
	if (key !== process.env.HYGRAPH_WEBHOOK_KEY) {
		return NextResponse.json(
			{ message: `No key !` },
			{
				status: 401,
			},
		);
	}

	if (
		typeof json === "object" &&
		json &&
		"data" in json &&
		typeof json.data === "object" &&
		json.data &&
		"id" in json.data &&
		typeof json.data.id === "string" &&
		"rating" in json.data &&
		typeof json.data.rating === "number"
	) {
		const product = await getProductById(json.data.id);
		const newRating =
			Number(product?.averageRating) + json.data.rating;

		await updateProductRating(json.data.id, newRating.toString());

		return NextResponse.json(
			{ message: "Product updated" },
			{ status: 201 },
		);
	}

	return NextResponse.json(
		{ message: `Invalid body !! ${JSON.stringify(json)}` },
		{
			status: 400,
		},
	);
}
