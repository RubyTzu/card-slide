import type { Metadata } from "next";
import "@/app/lib/globals.css";
import { inter, notoSansTC } from "@/app/lib/fonts";

export const metadata: Metadata = {
  title: "Card Slide Project",
  description: "Card Slide Project is a Next.js application that showcases card sliding animations.",
  icons: {
    icon: "/images/favicon.ico"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="zh-TW">
      <body className={`${inter.variable}  ${notoSansTC.variable} antialiased font-sans`}>{children}</body>
    </html>
  );
}
