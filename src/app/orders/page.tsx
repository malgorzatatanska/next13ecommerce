import { currentUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { OrdersGetByEmail } from "@/api/orders";

export default async function OrdersPage() {
	const user = await currentUser();
	const email = user?.emailAddresses[0].emailAddress;

	if (!email) {
		return <p> Brak maila. </p>;
	}

	const orders = await OrdersGetByEmail(email);
	console.log("zaowienia", orders);

	return (
		<div className="mx-auto text-gray-500">
			<section className="body-font text-gray-600">
				<div className="container mx-auto px-5 py-24">
					<div className="mb-20 flex w-full flex-col text-center">
						<h1 className="title-font mb-2 text-3xl font-medium text-gray-900 sm:text-4xl">
							Czesc,
							{user.firstName ? user.firstName : ""}
						</h1>
						<p className="mx-auto text-base leading-relaxed lg:w-2/3">
							Ponizej znajdziesz liste swoim zamowien
						</p>
					</div>
					<div className="mx-auto w-full overflow-auto lg:w-2/3">
						<table className="whitespace-no-wrap w-full table-auto text-left">
							<thead>
								<tr>
									<th className="title-font rounded-bl rounded-tl bg-gray-100 px-4 py-3 text-sm font-medium tracking-wider text-gray-900">
										Utworzone
									</th>
									<th className="title-font bg-gray-100 px-4 py-3 text-sm font-medium tracking-wider text-gray-900">
										Status
									</th>
									<th className="title-font bg-gray-100 px-4 py-3 text-sm font-medium tracking-wider text-gray-900">
										Ilosc produktów
									</th>
									<th className="title-font bg-gray-100 px-4 py-3 text-sm font-medium tracking-wider text-gray-900">
										Suma
									</th>
									<th className="title-font w-10 rounded-br rounded-tr bg-gray-100 text-sm font-medium tracking-wider text-gray-900"></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order.id}>
										<td className="px-4 py-3">
											{dayjs(order.createdAt as string).format(
												"YYYY-MM-DD",
											)}
										</td>
										<td className="px-4 py-3">
											{order.paymentStatus
												? order.paymentStatus
												: "w trakcie przetrwarzania"}
										</td>
										<td className="px-4 py-3">
											{order.orderItems.length}
										</td>
										<td className="px-4 py-3 text-lg text-gray-900">
											{order.total}
										</td>
										<td className="w-10 cursor-pointer text-center underline">
											zobacz
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="mx-auto mt-4 flex w-full pl-4 lg:w-2/3">
						<a className="inline-flex items-center text-pink-500 md:mb-2 lg:mb-0">
							Więcej
							<svg
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								className="ml-2 h-4 w-4"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7"></path>
							</svg>
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
