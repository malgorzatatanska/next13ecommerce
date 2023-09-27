"use client";

export default function ErrorPage({
	error,
}: {
	error: Error & { digest: string };
	reset: () => void;
}) {
	return (
		<div className="flex h-screen w-screen items-center justify-center text-gray-600">
			<h2>Something went wrong... {error.digest}</h2>
		</div>
	);
}
