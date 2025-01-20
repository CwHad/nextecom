"use client";

import "./globals.css";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import { TopNav } from "@/components/nav/TopNav";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { CategoryProvider } from "@/context/category";
import { TagProvider } from "@/context/tag";
import { ProductProvider } from "@/context/product";
import { CartProvider } from "@/context/cart";
import Footer from "@/components/Footer";

// export const metadata = {
//   title: "Nextecom",
//   description: "Ecommerce app using Nextjs Full Stack",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <CategoryProvider>
          <TagProvider>
            <ProductProvider>
              <CartProvider>
                <body>
                  <TopNav />
                  <Toaster />
                  {children}
                  <Footer />
                </body>
              </CartProvider>
            </ProductProvider>
          </TagProvider>
        </CategoryProvider>
      </SessionProvider>
    </html>
  );
}
