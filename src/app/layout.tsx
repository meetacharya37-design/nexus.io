import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUS — AI Social Finance",
  description: "Premium futuristic 3D AI-powered social finance platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} dark`}
    >
      <body className="bg-[#05060f] text-white antialiased overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
