"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { Route } from "next";

// const removeLeadingSlash = (str: string) => {
// 	if (str.charAt(0) === "/") {
// 		return str.slice(1);
// 	}
// 	return str;
// };

export const ActiveLink = <T extends string>({
	href,
	children,
	className,
	activeClassName,
	exact,
}: {
	href: Route<T>;
	children?: React.ReactNode;
	className: string;
	activeClassName: string;
	exact?: boolean;
}) => {
	const pathname = usePathname();
	const paths = pathname.split("/");
	const hrefSplit = href.split("/");
	const pathLength = Number(paths.length) - 2;

	const isActive = exact
		? pathname === href
		: pathLength > 0 && hrefSplit.includes(paths[pathLength] || "");

	return (
		<Link
			className={clsx(className, isActive && activeClassName)}
			href={href as Route}
		>
			{children}
		</Link>
	);
};
