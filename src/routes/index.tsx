import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Scissors,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Agendamento } from "@/components/site/Agendamento";
import { Header } from "@/components/site/Header";
import { CONTATO, HORARIOS, NUMEROS, SERVICOS, precoExibicao } from "@/config/barbearia";
import heroAsset from "@/assets/hero.png.asset.json";
import agendaAsset from "@/assets/agenda.png.asset.json";
import atendimentoAsset from "@/assets/atendimento.jpg.asset.json";
import acabamentoAsset from "@/assets/acabamento.jpg.asset.json";
import antesDepoisAsset from "@/assets/antesdepois.png.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Renato Matos Barbearia | Cortes, Barba e Estilo" },
      {
        name: "description",
        content:
          "Barbearia Renato Matos: cortes masculinos, barba e acabamento com atenção aos detalhes. Agende seu horário pelo WhatsApp.",
      },
      { property: "og:title", content: "Renato Matos Barbearia | Cortes, Barba e Estilo" },
      {
        property: "og:description",
        content:
          "Seu estilo, nosso trabalho. Cortes, barba e acabamento feitos com cuidado e precisão.",
      },
      { property: "og:image", content: `https://renatomatos.lovable.app${heroAsset.url}` },
      { name: "twitter:image", content: `https://renatomatos.lovable.app${heroAsset.url}` },
    ],
  }),
  component: Index,
});

const whatsUrl = (texto: string) =>
  `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section id="inicio" className="relative isolate min-h-[92svh] overflow-hidden bg-ink">
          <img
            src={heroAsset.url}
            alt="Cliente da Renato Matos Barbearia com corte degradê e barba alinhada"
            className="absolute inset-0 size-full object-cover object-[60%_28%] opacity-90 contrast-[1.05]"
          />
          <div className="photo-scrim absolute inset-0" />

          <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:pb-24 lg:px-8">
            <div className="reveal max-w-2xl">
              <span className="eyebrow text-accent">Barbearia Renato Matos</span>
              <h1 className="mt-5 text-[2.7rem] font-semibold uppercase leading-[0.95] text-on-dark sm:text-6xl lg:text-7xl">
                Seu estilo.
                <br />
                Nosso trabalho.
              </h1>
              <p className="mt-6 max-w-md text-base text-on-dark-muted sm:text-lg">
                Cortes, barba e estilo feitos com atenção aos detalhes.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button variant="accent" size="pillLg" asChild>
                  <a href="#agendamento">Agendar horário</a>
                </Button>
                <Button variant="onDark" size="pillLg" asChild>
                  <a href="#servicos">Ver serviços</a>
                </Button>
              </div>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-on-dark/15 pt-6">
              {NUMEROS.map((n) => (
                <div key={n.label}>
                  <p className="font-display text-2xl text-on-dark sm:text-3xl">{n.valor}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-on-dark-muted">
                    {n.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="bg-background py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-2xl border border-border bg-secondary/60 p-10 shadow-soft">
                <img
                  src={logoAsset.url}
                  alt="Logo Renato Matos Barbearia"
                  className="mx-auto w-full max-w-[320px]"
                />
              </div>
            </div>

            <div>
              <span className="eyebrow text-accent">A barbearia</span>
              <h2 className="mt-4 text-3xl font-semibold uppercase leading-tight sm:text-5xl">
                Mais do que um corte,
                <br />
                uma experiência.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Na Renato Matos Barbearia, cada atendimento começa por ouvir o cliente. Entender o
                formato do rosto, o tipo de cabelo e o estilo de cada pessoa é o que permite entregar
                um corte que funciona no dia a dia — e não apenas no dia da visita.
              </p>
              <p className="mt-4 text-muted-foreground">
                O trabalho é feito com calma, técnica e acabamento caprichado. Ambiente organizado,
                conversa boa e o compromisso de que você saia daqui satisfeito com o resultado.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Acabamento preciso",
                  "Atendimento com hora marcada",
                  "Produtos de qualidade",
                  "Ambiente acolhedor",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <Scissors className="size-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="bg-secondary/50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <span className="eyebrow text-accent">Serviços</span>
              <h2 className="mt-4 text-3xl font-semibold uppercase sm:text-5xl">
                O que fazemos na cadeira
              </h2>
              <p className="mt-4 text-muted-foreground">
                Catálogo completo com valores e duração de cada atendimento.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICOS.map((s) => (
                <article
                  key={s.nome}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy/30 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold uppercase">{s.nome}</h3>
                    <span className="shrink-0 rounded-full bg-navy px-3 py-1 text-center font-display text-sm text-on-dark">
                      {precoExibicao(s)}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {s.desc ?? `Duração aproximada: ${s.duracaoMin} minutos.`}
                  </p>
                  <Button variant="quiet" size="pill" className="mt-6 self-start" asChild>
                    <a href="#agendamento">Agendar</a>
                  </Button>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="bg-ink py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <span className="eyebrow text-accent">Galeria</span>
              <h2 className="mt-4 text-3xl font-semibold uppercase text-on-dark sm:text-5xl">
                Trabalhos da casa
              </h2>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <figure className="group relative overflow-hidden rounded-2xl sm:row-span-2">
                <img
                  src={heroAsset.url}
                  alt="Corte degradê com barba desenhada"
                  className="h-72 w-full object-cover object-[60%_30%] transition-transform duration-700 group-hover:scale-105 sm:h-full sm:min-h-[36rem]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 font-display text-sm uppercase tracking-widest text-on-dark">
                  Degradê + barba
                </figcaption>
              </figure>

              <figure className="group relative overflow-hidden rounded-2xl">
                <img
                  src={atendimentoAsset.url}
                  alt="Cliente em atendimento na Renato Matos Barbearia"
                  className="h-72 w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 font-display text-sm uppercase tracking-widest text-on-dark">
                  Atendimento
                </figcaption>
              </figure>

              <figure className="group relative overflow-hidden rounded-2xl">
                <img
                  src={acabamentoAsset.url}
                  alt="Barbeiro finalizando o acabamento do corte"
                  className="h-72 w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 font-display text-sm uppercase tracking-widest text-on-dark">
                  Acabamento
                </figcaption>
              </figure>

              <figure className="group relative overflow-hidden rounded-2xl sm:col-span-2">
                <img
                  src={antesDepoisAsset.url}
                  alt="Antes e depois do corte e barba"
                  className="h-80 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 sm:h-96"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 font-display text-sm uppercase tracking-widest text-on-dark">
                  Antes e depois
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* DESTAQUE DA MARCA */}
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-border shadow-lift">
              <img
                src={agendaAsset.url}
                alt="Arte da Renato Matos Barbearia: Você agenda, a gente capricha"
                className="w-full object-contain"
              />
            </div>
            <div>
              <span className="eyebrow text-accent">Você agenda</span>
              <h2 className="mt-4 text-3xl font-semibold uppercase leading-tight sm:text-5xl">
                A gente capricha.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Marque seu horário e chegue na hora certa: sem fila, sem espera e com o tempo
                dedicado só ao seu atendimento.
              </p>
              <Button variant="brand" size="pillLg" className="mt-8" asChild>
                <a href="#agendamento">Agendar agora</a>
              </Button>
            </div>
          </div>
        </section>

        {/* PROCESSO */}
        <section className="bg-navy-deep py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <img
                src={acabamentoAsset.url}
                alt="Barbeiro realizando o corte na Renato Matos Barbearia"
                className="h-full max-h-[32rem] w-full object-cover object-center"
              />
            </div>
            <div>
              <span className="eyebrow text-accent">A experiência</span>
              <h2 className="mt-4 text-3xl font-semibold uppercase leading-tight text-on-dark sm:text-5xl">
                Do primeiro contato
                <br />
                ao acabamento.
              </h2>

              <ol className="mt-10 space-y-8">
                {[
                  { n: "01", t: "Escolha seu serviço", d: "Corte, barba, acabamento ou o combo completo." },
                  { n: "02", t: "Agende seu horário", d: "Data e hora definidas por você, confirmadas no WhatsApp." },
                  { n: "03", t: "Sente na cadeira e aproveite", d: "O resto é com a gente: técnica, calma e acabamento." },
                ].map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span className="font-display text-2xl text-accent">{step.n}</span>
                    <div className="border-l border-on-dark/15 pl-5">
                      <h3 className="text-lg font-semibold uppercase text-on-dark">{step.t}</h3>
                      <p className="mt-1 text-sm text-on-dark-muted">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* AVALIAÇÕES */}
        <section id="avaliacoes" className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <span className="eyebrow text-accent">Avaliações</span>
              <h2 className="mt-4 text-3xl font-semibold uppercase sm:text-5xl">
                O que dizem os clientes
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Conteúdo temporário e demonstrativo — será substituído pelas avaliações reais.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {AVALIACOES.map((a, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-border bg-card p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
                >
                  <Quote className="size-6 text-accent" />
                  <p className="mt-4 text-sm text-muted-foreground">{a.texto}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-display text-sm uppercase tracking-widest">{a.nome}</span>
                    <span className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="size-3.5 fill-accent text-accent" />
                      ))}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section id="localizacao" className="bg-secondary/50 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
            <div>
              <span className="eyebrow text-accent">Localização</span>
              <h2 className="mt-4 text-3xl font-semibold uppercase sm:text-5xl">Onde nos encontrar</h2>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-display text-sm uppercase tracking-widest">Endereço</p>
                    <p className="mt-1 text-muted-foreground">{CONTATO.endereco}</p>
                    <p className="text-muted-foreground">{CONTATO.cidade}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-display text-sm uppercase tracking-widest">Contato</p>
                    <p className="mt-1 text-muted-foreground">{CONTATO.telefoneExibicao}</p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Instagram className="size-4" /> {CONTATO.instagram}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button variant="brand" size="pillLg" asChild>
                  <a href={CONTATO.mapsUrl} target="_blank" rel="noreferrer">
                    <Navigation className="size-4" />
                    Como chegar
                  </a>
                </Button>
                <Button variant="quiet" size="pillLg" asChild>
                  <a
                    href={whatsUrl("Olá! Gostaria de falar com a Renato Matos Barbearia.")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-accent" />
                <p className="font-display text-sm uppercase tracking-widest">
                  Horário de funcionamento
                </p>
              </div>
              <ul className="mt-6 divide-y divide-border">
                {HORARIOS.map((h) => (
                  <li key={h.dia} className="flex items-center justify-between gap-4 py-4">
                    <span className="text-sm text-muted-foreground">{h.dia}</span>
                    <span className="font-display text-sm tracking-widest">{h.hora}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Agendamento />
      </main>

      {/* RODAPÉ */}
      <footer className="bg-ink py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 text-center sm:grid-cols-[auto_1fr] sm:text-left lg:px-8">
          <img
            src={logoAsset.url}
            alt="Renato Matos Barbearia"
            className="logo-on-dark mx-auto h-16 w-auto sm:mx-0"
          />
          <div className="flex flex-col justify-center gap-1">
            <p className="text-sm text-on-dark-muted">
              {CONTATO.endereco} · {CONTATO.cidade}
            </p>
            <p className="text-sm text-on-dark-muted">
              {CONTATO.telefoneExibicao} · {CONTATO.instagram}
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-on-dark-muted/70">
              © {new Date().getFullYear()} Renato Matos Barbearia ·{" "}
              <a href="/painel" className="underline underline-offset-4 hover:text-on-dark">
                Painel do barbeiro
              </a>
            </p>

          </div>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={whatsUrl("Olá! Gostaria de agendar um horário na Renato Matos Barbearia.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}
