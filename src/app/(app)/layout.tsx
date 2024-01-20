import Navbar from "@components/navbar";
import "./app-global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="container flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="py-4 w-full flex-1 flex flex-col">{children}</main>
    </body>
  );
}
