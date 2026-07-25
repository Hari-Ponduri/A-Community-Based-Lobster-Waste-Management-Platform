import type { Metadata } from "next";
import "./globals.css";
import { RestaurantProvider } from "@/lib/RestaurantContext";

export const metadata: Metadata = {
  title: "ShellCycle - Sustainable Biomaterial Sourcing",
  description:
    "Connecting seafood restaurants' shell waste with research labs that need crustacean shells for chitosan and biomaterials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <RestaurantProvider>{children}</RestaurantProvider>
      </body>
    </html>
  );
}
