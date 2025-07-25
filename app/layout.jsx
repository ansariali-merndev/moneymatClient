import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Money Mate",
    template: "%s | Money Mate",
  },
  description: "Generated by create next app",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto px-4`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
