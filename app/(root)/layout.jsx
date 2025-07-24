import { Authorized } from "@/components/Authorized";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Authorized />
      <Header />
      {children}
      <Footer />
    </>
  );
}
