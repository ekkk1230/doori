import type { Metadata } from "next";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
	<html lang="ko">
		<body className="relative min-h-screen bg-rose-50/30 overflow-x-hidden antialiased">
			<div
				className="pointer-events-none fixed inset-0 overflow-hidden z-0"
				aria-hidden="true"
			>
				<div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-200/50 blur-3xl" />
				<div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
				<div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-rose-200/40 blur-3xl" />
			</div>

			<div className="relative z-10">
				{children}
			</div>
		</body>
	</html>
  );
}
