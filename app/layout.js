import { Mulish } from "next/font/google";
import "./globals.css";
import GoToTopBtn from "@/components/gototopbtn/GoToTopBtn";
import { BlogProvider } from "@/contexts/BlogContext";
import { ContactProvider } from "@/contexts/ContactContext";
import { CommentProvider } from "@/contexts/CommentContext";

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
      <body className={`antialiased ${mulish.className} relative`}>
        <CommentProvider>
          <ContactProvider>
            <BlogProvider>{children}</BlogProvider>
          </ContactProvider>
        </CommentProvider>
        <GoToTopBtn />
      </body>
    </html>
  );
}
