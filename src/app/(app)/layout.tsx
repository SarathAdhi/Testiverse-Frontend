import Navbar from "@components/navbar";
import NextThemeProviders from "@components/theme-providers";
import { cn } from "@utils/cn";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import "./app-global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={cn("flex flex-col min-h-screen bg-background")}>
      <NextThemeProviders>
        <NextTopLoader showSpinner={false} />

        <Navbar />

        <main className="w-full flex-1 flex flex-col">{children}</main>
      </NextThemeProviders>

      <Toaster position="top-center" reverseOrder={false} />
    </body>
  );
}
