import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Axiom Token Discovery",
  description: "Pixel-perfect Axiom token table replica",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-axiom">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
