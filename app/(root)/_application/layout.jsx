import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({ children }) {
  return (
    <section className="flex gap-2">
      <section className="hidden md:inline-block">
        <Sidebar />
      </section>
      <div className="flex-1">{children}</div>
    </section>
  );
}
