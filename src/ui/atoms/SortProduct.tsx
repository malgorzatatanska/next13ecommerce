"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export enum SortTypes {
	price_ASC = "price_ASC",
	price_DESC = "price_DESC",
}

export const SortingTypes = {
	[SortTypes.price_ASC]: "Price ASC",
	[SortTypes.price_DESC]: "Price DESC",
};

export const SortProduct = () => {
	const router = useRouter();

	const [selectedSortType, setSelectedSortType] = useState(
		SortTypes.price_ASC,
	);

	return (
		<div className="flex max-w-2xl items-center justify-end  sm:px-6 sm:py-2 lg:max-w-7xl  lg:px-8 ">
			<label className="mr-4 flex text-sm font-medium text-gray-900 dark:text-white">
				Sort by
			</label>
			<select
				id="sorting"
				defaultValue={SortingTypes[SortTypes.price_ASC]}
				value={selectedSortType}
				onChange={(e) => {
					setSelectedSortType(e.target.value as SortTypes);
					router.push(`/products/1?sort=${e.target.value}`);
				}}
				className="block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
			>
				<option
					value={SortTypes.price_ASC}
					data-testid="sort-by-price"
				>
					{SortingTypes[SortTypes.price_ASC]}
				</option>
				<option
					value={SortTypes.price_DESC}
					data-testid="sort-by-price"
				>
					{SortingTypes[SortTypes.price_DESC]}
				</option>
			</select>
		</div>
	);
};
