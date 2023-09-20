import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { type Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

export const Pagination = async ({
	pages,
	href,
}: {
	pages: number[];
	href: string;
}) => {
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
							href={`/${href}/${item}` as Route}
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
