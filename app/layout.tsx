import type { Metadata } from "next";
import "./globals.css";
import { Gowun_Dodum } from "next/font/google";
// import Sidebar from "../components/mainLayout/sidebar";
import { Suspense } from "react";
// import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "@/components/sessionWrapper";
import { ConfigProvider } from "antd";
export const metadata: Metadata = {
  title: "Abay Gebeya",
  description: "Abay Gebeya - Best E-Commerce Platform",
};

const dongle = Gowun_Dodum({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#12B76A",
          },
        }}
      >
      <html lang="en">
        <body className={dongle.className}>
          <div className="grid min-h-screen w-full">
            <Suspense fallback={<div>Loading...</div>}>
              <main className="">{children}</main>
              {/* <Toaster /> */}
            </Suspense>
          </div>
        </body>
      </html>
      </ConfigProvider>
    </SessionWrapper>
  );
}
