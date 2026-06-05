import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import { AccountProvider } from "@/components/account/AccountProvider";
import { CartProvider } from "@/components/cart/CartProvider";
import { getCollectionCategories } from "@/lib/filters";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "sable",
  description: "A quiet select shop for considered clothing, objects, and edits."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const womenCategories = getCollectionCategories("women");
  const menCategories = getCollectionCategories("men");

  return (
    <html lang="en">
      <body>
        <AccountProvider>
          <CartProvider>
            <Header womenCategories={womenCategories} menCategories={menCategories} />
            <main>{children}</main>
          </CartProvider>
        </AccountProvider>
      </body>
    </html>
  );
}
