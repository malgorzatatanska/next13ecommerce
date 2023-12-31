import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/ui/organisms/Header";
import { Footer } from "@/ui/organisms/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<div className="min-h-screen bg-gray-50">
						<Header />
						{children}
						<Footer />
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
