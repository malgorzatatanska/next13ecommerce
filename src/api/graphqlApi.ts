import { type TypedDocumentString } from "@/gql/graphql";
export const executeGraphql = async <TResult, TVariables>(
	query: TypedDocumentString<TResult, TVariables>,
	variables: TVariables,
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL)
		throw new Error("GRAPHQL_URL is not defined");

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query /* GraphQL */,
			variables,
		}),
	});

	type GraphQlResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphqlResonse =
		(await res.json()) as GraphQlResponse<TResult>;
	if (graphqlResonse.errors) {
		throw new Error(`Graphql error`, {
			cause: graphqlResonse.errors,
		});
	}

	return graphqlResonse.data;
};
