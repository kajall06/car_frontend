

import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";
import AuthLoader from "./AuthLoader";
import Script from "next/script";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Car Rental",
  description: "Car Rental UI Clone",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={poppins.className}>
        
      <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {/* Page Content */}
        
      <Providers>
      
     <AuthLoader/>
      <Header />
          {children}
          <Footer/>
        </Providers>
       
      

      </body>
    </html>
  );
}