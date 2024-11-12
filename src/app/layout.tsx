import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/query/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business Farmacie - Login",
  description: "Agronomics Business Farmacie (Login)",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://farmacy-business.vercel.app/",
    title: "Business Farmacie",
    description: "Business Farmacie",
    images: [
      {
        url: "/assets/images/OG.png",
        width: 1200,
        height: 630,
        alt: "Business Farmacie",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
