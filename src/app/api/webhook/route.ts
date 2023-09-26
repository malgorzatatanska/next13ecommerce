import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
	const json: unknown = await request.json();

	if (
		typeof json === "object" &&
		json &&
		"slug" in json &&
		typeof json.slug === "string"
	) {
		json.slug;
		console.log(`Revalidating /product/${json.slug}`);
		revalidatePath(`/product/${json.slug}`);
		revalidatePath("/products");
		return NextResponse.json(
			{ message: "OK Revalidated" },
			{ status: 201 },
		);
	}

	return NextResponse.json(
		{ message: "Invalid body" },
		{
			status: 400,
		},
	);
}
