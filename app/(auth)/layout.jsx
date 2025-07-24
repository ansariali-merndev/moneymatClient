import Image from "next/image";
import auth from "../../assets/auth.png";

export default function AuthLayout({ children }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2">
      <section className="hidden h-screen bg-[#1E1E1E] md:flex items-center justify-center">
        <Image
          src={auth}
          alt="Auth"
          width={500}
          height={500}
          priority={true}
          style={{ height: "auto" }}
          className="rounded-lg h-auto"
        />
      </section>
      <section className="flex flex-col items-center justify-center h-screen md:h-auto">
        {children}
      </section>
    </main>
  );
}
