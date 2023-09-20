import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ActiveLink } from "../atoms/ActiveLink";
import { getProductsCount } from "@/api/products";

export const Pagination = async () => {
	const products = await getProductsCount();

	const pages = Array.from(
		{ length: Math.ceil(products / 4) },
		(_, index) => index + 1,
	);

	return (
		<>
			<div
				aria-label="Pagination"
				className="flex flex-row items-center justify-center  align-middle"
			>
				<div className="cursor-pointer">
					<FaAngleLeft />
				</div>
				{pages.map((item) => {
					return (
						<ActiveLink
							className="cursor-pointer pr-2 text-gray-500"
							key={item}
							href={`/products/${item}`}
							activeClassName="underline"
							exact={true}
						>
							{item}
						</ActiveLink>
					);
				})}
				<div className="cursor-pointer">
					<FaAngleRight />
				</div>
			</div>
		</>
	);
};
