import Link from "next/link";
import Image from "next/image";
import { ProductList } from "@/ui/organisms/ProductList";
import { getProductsList } from "@/api/products";
import { CollectionList } from "@/ui/organisms/CollectionList";

export default async function Home() {
	const products = await getProductsList("1");

	return (
		<>
			<div className="relative  bg-gray-50">
				<div className="pb-80 pt-2 sm:pb-40 sm:pt-10 lg:pb-20 lg:pt-10">
					<div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 sm:static sm:px-6 lg:flex-row lg:px-8">
						<div className="sm:max-w-lg ">
							<h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Twoje Źródło Pielęgnacji i Urody Online
							</h1>
							<p className="mt-6 text-xl text-gray-500">
								The new collection boasts a vibrant and eclectic range
								of fashion-forward designs, perfect for those seeking
								a fresh and distinctive style.
							</p>
							<div>
								<Link
									href="/products"
									className="mt-6 inline-block rounded-md border border-transparent bg-pink-600 px-10 py-3 text-center font-medium tracking-wide text-white hover:bg-pink-700"
								>
									Przeglądaj
								</Link>
							</div>
						</div>
						<div className="mt-10 flex h-full w-full ">
							<div className="grid h-full w-full  grid-cols-2 gap-2 md:grid-cols-3 md:gap-2">
								<div className="relative flex items-center justify-center">
									<div className="h-64 w-44">
										<Image
											src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
											alt="nasz sklep"
											width={176}
											height={256}
										/>
									</div>
								</div>
								{/* this part is visible from md  */}
								<div className="hidden md:flex md:flex-col md:gap-2">
									<div className="md:flex md:items-center md:justify-center ">
										<Image
											src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
											alt="nasz sklep"
											width={176}
											height={256}
										/>
									</div>
									<div className="md:flex md:items-center md:justify-center md:gap-2">
										<Image
											src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
											alt="nasz sklep"
											width={176}
											height={256}
										/>
									</div>
								</div>
								{/* This part is visible only for sm to md */}
								<div className="flex md:hidden ">
									<Image
										src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
										alt="nasz sklep"
										width={176}
										height={256}
									/>
								</div>
								<div className="flex items-center justify-center md:hidden">
									<Image
										src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
										alt="nasz sklep"
										width={176}
										height={256}
									/>
								</div>
								<div className="flex md:items-center md:justify-center ">
									<Image
										src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
										alt="nasz sklep"
										width={176}
										height={256}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mx-auto mt-20 flex max-w-7xl justify-center text-gray-400">
					<CollectionList />
				</div>
				<div className="mx-auto mt-20 flex max-w-7xl justify-center pb-20 text-gray-400">
					<ProductList products={products} />
				</div>
			</div>
		</>
	);
}
