import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import AuthProvider from '@/components/auth/AuthProvider';
import Navigation from '@/components/Navigation';
import type { Metadata } from "next";
import { MessageProvider } from "@/context/MessageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Admin",
  description: "School Administration System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      {/* <head /> */}

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <AuthProvider>
          <MessageProvider>
            <main>{children}</main>
            <ScrollToTop />
          </MessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}



