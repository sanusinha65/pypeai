import type { Metadata } from "next";
import { Inter as FontInter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/utils/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const fontInter = FontInter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
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
          "min-h-screen antialiased bg-white dark:bg-[#18181a]",
          fontInter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}