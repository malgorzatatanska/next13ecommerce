import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="mx-auto mb-20 mt-20 max-w-2xl">
			<SignIn />
		</div>
	);
}
