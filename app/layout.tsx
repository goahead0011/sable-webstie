import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/components/cart/CartProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "sable",
  description: "A quiet select-shop MVP."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
