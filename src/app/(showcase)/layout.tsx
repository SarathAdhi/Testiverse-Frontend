import { Toaster } from "react-hot-toast";
import "../(app)/app-global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="flex flex-col min-h-screen bg-background">
      <main className="w-full flex-1 flex flex-col">{children}</main>

      <Toaster position="top-center" reverseOrder={false} />
    </body>
  );
}
