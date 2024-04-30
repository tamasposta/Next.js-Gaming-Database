import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import 'tailwindcss'
import Header from "./components/Header";
import Footer from "./components/Footer";

const poppins = Poppins({ 
  weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--poppins-font", 
});

export const metadata: Metadata = {
  title: "Gaming Database",
  description: "Upcoming and released games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dark" lang="en">
      <body className={poppins.className}>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
