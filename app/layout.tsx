import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Obudu Mountain Resort | Studio Ghibli Scrollytelling Journey",
  description:
    "An immersive, hand-painted interactive journey up the 11km serpentine pass to Obudu Cattle Ranch, Cross River State, Nigeria. Ascend 1,576 meters into the misty highlands.",
  keywords: [
    "Obudu Mountain Resort",
    "Obudu Cattle Ranch",
    "Cross River Nigeria",
    "Scrollytelling",
    "Studio Ghibli art style",
    "Interactive Travel Experience",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-[#18311B] text-[#2C352E] selection:bg-[#D99B35]/30 selection:text-[#1A3115]"
        suppressHydrationWarning
      >
        <div className="ghibli-grain" aria-hidden="true" />
        <div className="ghibli-vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
