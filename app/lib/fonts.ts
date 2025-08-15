import { Inter, Noto_Sans_TC, Zilla_Slab } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-notoSansTC",
});

export const zilla = Zilla_Slab({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-zilla" });