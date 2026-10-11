import { Mulish } from "next/font/google";
import "./globals.css";
import "@/styles/shaba-tokens.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: { default: "Shaba Water Company | Borama, Somaliland", template: "%s | Shaba Water Company" },
  description: "Water services for Borama. Discover Shaba’s work, projects, publications, and opportunities to collaborate.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${mulish.className} relative`}>
        {children}
      </body>
    </html>
  );
}
