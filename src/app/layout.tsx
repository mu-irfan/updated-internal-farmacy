import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/query/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agronomics Internal Farmacie - Login",
  description: "Agronomics Internal Farmacie (Login)",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://admin.agronomics.pk/",
    title: "Agronomics Internal Farmacie",
    description: "Agronomics Internal Farmacie",
    images: [
      {
        url: "/assets/images/OG.png",
        width: 1200,
        height: 630,
        alt: "Agronomics Internal Farmacie",
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
