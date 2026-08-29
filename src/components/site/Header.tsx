import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo.png.asset.json";

const LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#localizacao", label: "Localização" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/95 shadow-lift backdrop-blur" : "bg-gradient-to-b from-ink/80 to-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Renato Matos Barbearia"
            className="logo-on-dark h-11 w-auto shrink-0 sm:h-14"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-[0.78rem] uppercase tracking-[0.18em] text-on-dark-muted transition-colors hover:text-on-dark"
            >
              {l.label}
            </a>
          ))}
          <Button variant="accent" size="pill" asChild>
            <a href="#agendamento">Agendar horário</a>
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-on-dark/25 text-on-dark lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-on-dark/10 bg-ink/98 px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-on-dark/10 py-4 font-display text-base uppercase tracking-[0.16em] text-on-dark"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Button variant="accent" size="pillLg" className="mt-6 w-full" asChild>
            <a href="#agendamento" onClick={() => setOpen(false)}>
              Agendar horário
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
