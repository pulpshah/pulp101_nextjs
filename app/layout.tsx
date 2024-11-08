import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import ClientApplication from "@/components/ClientApplication";
import Script from "next/script";
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: "Pulp101",
  metadataBase: new URL("https://ariadocs.vercel.app/"),
  description:
    "This comprehensive documentation template, crafted with Next.js and available as open-source, delivers a sleek and responsive design, tailored to meet all your project documentation requirements.",
};

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientApplication>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Add Poppins font from Google Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
        </head>
        <PHProvider>
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} font-regular antialiased`}
          suppressHydrationWarning
        >
          <PostHogPageView /> 
          <Script id="reb2b-script" strategy="lazyOnload">
          {`
            !function () {
              var reb2b = window.reb2b = window.reb2b || [];
              if (reb2b.invoked) return;
              reb2b.invoked = true;
              reb2b.methods = ["identify", "collect"];
              reb2b.factory = function (method) {
                return function () {
                  var args = Array.prototype.slice.call(arguments);
                  args.unshift(method);
                  reb2b.push(args);
                  return reb2b;
                };
              };
              for (var i = 0; i < reb2b.methods.length; i++) {
                var key = reb2b.methods[i];
                reb2b[key] = reb2b.factory(key);
              }
              reb2b.load = function (key) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.async = true;
                script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";
                var first = document.getElementsByTagName("script")[0];
                first.parentNode.insertBefore(script, first);
              };
              reb2b.SNIPPET_VERSION = "1.0.1";
              reb2b.load("961Y0HX0XYNG");
            }();
          `}
          </Script>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="sm:container mx-auto w-[90vw] h-auto">
              {children}
            </main>
          </ThemeProvider>
        </body>
        </PHProvider>
      </html>
    </ClientApplication>
  );
}
