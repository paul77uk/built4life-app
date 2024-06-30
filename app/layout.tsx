import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navigation/nav";
import { ThemeProvider } from "@/providers/theme-provider";
import Toast from "@/components/ui/toast";
import QueryProvider from "@/providers/query-provider";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import SubNav from "@/components/navigation/sub-nav";


const roboto = Roboto({ weight: "400", preload: false });

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
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              forcedTheme="dark"
            >
              <Nav />
              <SubNav />
              <Toast />
              {children}
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
