import { Mulish } from "next/font/google";
import "./globals.css";
import GoToTopBtn from "@/components/gototopbtn/GoToTopBtn";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights you need
});

export const metadata = {
  title: "Shaba water company",
  description: "Shirkada adeegyada bulshada Awdal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body
        className={`antialiased ${mulish.className} relative`}
      >
        {children}
        <GoToTopBtn />
      </body>
    </html>
  );
}
