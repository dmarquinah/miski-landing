import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Nosotros } from "@/components/sections/Nosotros";
import { QueHacemos } from "@/components/sections/QueHacemos";
import { ComoLoHacemos } from "@/components/sections/ComoLoHacemos";
import { Mision } from "@/components/sections/Mision";
import { Catalogo } from "@/components/sections/Catalogo";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/sections/Footer";
import { DottedDivider } from "@/components/ui/DottedDivider";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalogo />
        <Nosotros />
        <DottedDivider />
        <QueHacemos />
        <DottedDivider />
        <ComoLoHacemos />
        <Mision />
        <Contacto />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
