import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { ToastHost } from "./ToastHost";
import { WelcomePopup } from "./WelcomePopup";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-28 lg:pt-32">{children}</main>
      <Footer />
      <WhatsAppButton />
      <ToastHost />
      <WelcomePopup />
    </div>
  );
}
