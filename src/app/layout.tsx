import type { Metadata } from "next";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "HelpUS RealEstate — Premier Real Estate & Realtor Network",
  description: "HelpUS RealEstate platform connecting licensed realtors, luxury properties, interactive map search, and verified listings.",
  icons: {
    icon: "/helpus_logo.png",
    shortcut: "/helpus_logo.png",
    apple: "/helpus_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased bg-[#0b0f19] text-slate-100">
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
