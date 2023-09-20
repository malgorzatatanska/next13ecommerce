"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

const schema = yup
	.object({
		searchValue: yup.string().required(),
	})
	.required();

type SearchFormData = yup.InferType<typeof schema>;

export const Search = () => {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 500);

	const { handleSubmit, register, resetField } =
		useForm<SearchFormData>({});

	const onSubmit = (data: SearchFormData) => {
		if (data.searchValue && data.searchValue.length > 0) {
			router.push(`/search?query=${data.searchValue}`);
			resetField("searchValue");
		}
	};

	useEffect(() => {
		if (debouncedSearch.length > 0) {
			router.push(`/search?query=${debouncedSearch}`);
			resetField("searchValue");
		}
	}, [debouncedSearch, router, resetField]);

	const handleEnter = (
		event: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (event.key === "Enter") {
			if (event.currentTarget.value.length > 0) {
				router.push(`/search?query=${search}`);
				resetField("searchValue");
			}
		}
	};

	return (
		<form
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onSubmit={handleSubmit(onSubmit)}
			// onKeyDown={(e) => handleEnter(e)}
		>
			<div className="flex">
				<input
					className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
					type="text"
					placeholder="search"
					id="searchValue"
					{...register("searchValue")}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={handleEnter}
				/>
				<div className="hidden sm:flex">
					<button className="rounded-md bg-pink-300 px-5 py-2.5 text-sm font-medium text-white shadow">
						Szukaj
					</button>
				</div>
			</div>
		</form>
	);
};
