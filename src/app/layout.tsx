// ============================================
// File Purpose: Root layout wrapper for the Pulp101 app with theming, auth, and global styles
// Original Author: Mohammed Ihtisham
// Last Updated By: Assistant
// Last Updated On: 05/03/2025
// ============================================

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import ToolbarOverlay from "@/components/Overlay/ToolbarOverlayV2";
import ClientApplication from "@/components/ClientApplication";
import AuthProvider from "@/lib/session-provider";

export const metadata: Metadata = {
  title: "Pulp101",
  metadataBase: new URL("https://ariadocs.vercel.app/"),
  description:
    "This comprehensive documentation template, crafted with Next.js and available as open-source, delivers a sleek and responsive design, tailored to meet all your project documentation requirements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientApplication>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Poppins */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* Inter */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} font-inter antialiased`}
          suppressHydrationWarning
        >
          <ToolbarOverlay>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProvider>
                <Navbar/>
                {children}
              </AuthProvider>
            </ThemeProvider>
          </ToolbarOverlay>
        </body>
      </html>
    </ClientApplication>
  );
}
