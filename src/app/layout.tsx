import type { Metadata } from "next";
import { Share_Tech_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  weight: "400",
  subsets: ["latin"],
});

const ibmPlex = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TweakForge",
  description: "TweakForge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // default was className={`${shareTechMono.variable} etc, not sure why .className would work...
        className={`${ibmPlex.className} ${shareTechMono.className}`}
      >
        {children}
      </body>
    </html>
  );
}
