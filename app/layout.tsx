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

// iOS Safari auto-zooms when a focused input's font-size is under 16px.
// Adding maximum-scale=1 suppresses that focus zoom, and since iOS 10 Safari
// ignores maximum-scale for user pinch gestures, so pinch zoom keeps working.
// Scoped to iOS only because Android Chrome would actually block pinch zoom.
const iosViewportFix = `
(function () {
  var isIos =
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (!isIos) return;
  var meta = document.querySelector('meta[name="viewport"]');
  if (meta) {
    meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");
  }
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const womenCategories = getCollectionCategories("women");
  const menCategories = getCollectionCategories("men");

  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: iosViewportFix }} />
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
