import type { Metadata } from "next";
import { Afacad as FontAfacad, Inter as FontInter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/utils/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fontInter = FontInter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const fontAfacad = FontAfacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-afacad",
});

export const metadata: Metadata = {
  title: "Pype AI",
  description: "Pype unifies product data, offering AI-driven insights, predictive analytics, and real-time monitoring. Boost decision-making with 24/7 intelligent assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen antialiased bg-white dark:bg-[#18181a] text-black dark:text-white",
          fontInter.variable, fontAfacad.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <ThemeSwitcher />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}