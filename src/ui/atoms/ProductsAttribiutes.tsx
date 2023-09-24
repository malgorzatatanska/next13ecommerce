export const ProductsAttribiutes = () => {
	return (
		<div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
			<div className="flex">
				<span className="mr-3 text-gray-400">Color</span>
				<button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
				<button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
				<button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-indigo-500 focus:outline-none"></button>
			</div>
			<div className="ml-6 flex items-center">
				<span className="mr-3 text-gray-400">Size</span>
				<div className="relative">
					<select className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200">
						<option>SM</option>
						<option>M</option>
						<option>L</option>
						<option>XL</option>
					</select>
					<span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="h-4 w-4"
							viewBox="0 0 24 24"
						>
							<path d="M6 9l6 6 6-6"></path>
						</svg>
					</span>
				</div>
			</div>
		</div>
	);
};
