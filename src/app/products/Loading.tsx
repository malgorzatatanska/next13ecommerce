export default function Loading() {
	return (
		<div
			aria-busy="true"
			className="flex h-screen w-screen animate-spin items-center justify-center"
		>
			<h2>Loading...</h2>
		</div>
	);
}
