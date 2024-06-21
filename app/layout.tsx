import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navigation/nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Toast from "@/components/ui/toast";
import QueryProvider from "@/components/providers/query-provider";
import { cn } from "@/lib/utils";

const roboto = Roboto({ weight: "400", preload: false});

export const metadata: Metadata = {
  title: "Built 4 Life",
  description: "Workout tracking app for the fitness enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(roboto.className, "bg-[#1E1E1E]")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Nav />
          <Toast />
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
