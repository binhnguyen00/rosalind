import { Navbar, Footer } from "@components";
import { cn } from "@heroui/react";

interface DefaultLayoutProps {
  children: React.ReactNode;
}
export default function DefaultLayout(props: DefaultLayoutProps) {
  const { children } = props;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className={cn(
          "p-6", "outline-none",
          "flex", "flex-col", "flex-1",
          "overflow-y-auto",
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
