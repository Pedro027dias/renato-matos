import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { formatarData, hojeISO } from "@/lib/agenda";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Painel de agendamentos | Renato Matos Barbearia" },
      {
        name: "description",
        content:
          "Área do barbeiro: consulte todos os agendamentos com cliente, serviço, horário e duração.",
      },
      { property: "og:title", content: "Painel de agendamentos | Renato Matos Barbearia" },
      {
        property: "og:description",
        content: "Área do barbeiro para consultar os agendamentos da barbearia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Painel,
});

type Agendamento = {
  id: string;
  cliente_nome: string;
  cliente_telefone: string;
  barbeiro: string;
  servico: string;
  preco: string;
  duracao_min: number;
  inicio: string;
  fim: string;
  status: string;
};

function hora(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function Painel() {
  const [sessao, setSessao] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [itens, setItens] = useState<Agendamento[]>([]);
  const [dia, setDia] = useState(hojeISO());
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSessao(Boolean(s)));
    supabase.auth.getSession().then(({ data }) => setSessao(Boolean(data.session)));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function carregar() {
    setCarregando(true);
    const inicio = new Date(`${dia}T00:00:00`);
    const fim = new Date(inicio.getTime() + 24 * 60 * 60 * 1000);
    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .gte("inicio", inicio.toISOString())
      .lt("inicio", fim.toISOString())
      .order("inicio", { ascending: true });
    setCarregando(false);
    if (error) {
      toast.error("Sem permissão para ver os agendamentos ou falha de conexão.");
      return;
    }
    setItens((data ?? []) as Agendamento[]);
  }

  useEffect(() => {
    if (sessao) void carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessao, dia]);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) toast.error("E-mail ou senha inválidos.");
  }

  async function cancelar(id: string) {
    const { error } = await supabase
      .from("agendamentos")
      .update({ status: "cancelado" })
      .eq("id", id);
    if (error) return toast.error("Não foi possível cancelar.");
    toast.success("Agendamento cancelado — horário liberado.");
    void carregar();
  }

  const total = useMemo(() => itens.filter((i) => i.status !== "cancelado").length, [itens]);

  if (sessao === null) return <div className="min-h-screen bg-ink" />;

  if (!sessao) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-5">
        <form
          onSubmit={entrar}
          className="w-full max-w-sm rounded-2xl border border-on-dark/12 bg-card/40 p-8 shadow-lift"
        >
          <h1 className="text-2xl font-semibold uppercase text-on-dark">Painel do barbeiro</h1>
          <p className="mt-2 text-sm text-on-dark-muted">Entre para ver os agendamentos.</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="mt-6 h-12 w-full rounded-lg border border-on-dark/20 bg-on-dark/5 px-4 text-on-dark outline-none focus:border-accent"
          />
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="mt-3 h-12 w-full rounded-lg border border-on-dark/20 bg-on-dark/5 px-4 text-on-dark outline-none focus:border-accent"
          />
          <Button type="submit" variant="accent" size="pillLg" className="mt-6 w-full">
            Entrar
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow text-accent">Painel</span>
            <h1 className="mt-2 text-3xl font-semibold uppercase text-on-dark">Agendamentos</h1>
            <p className="mt-1 text-sm text-on-dark-muted">
              {total} agendamento(s) em {formatarData(dia)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="date"
              value={dia}
              onChange={(e) => setDia(e.target.value)}
              className="h-11 rounded-lg border border-on-dark/20 bg-on-dark/5 px-3 text-on-dark outline-none focus:border-accent"
            />
            <Button variant="quiet" size="pill" onClick={() => void carregar()} disabled={carregando}>
              <RefreshCw className="size-4" /> Atualizar
            </Button>
            <Button variant="quiet" size="pill" onClick={() => supabase.auth.signOut()}>
              <LogOut className="size-4" /> Sair
            </Button>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {itens.length === 0 ? (
            <p className="flex items-center gap-2 rounded-xl border border-on-dark/12 bg-card/30 p-6 text-on-dark-muted">
              <CalendarDays className="size-4" /> Nenhum agendamento nessa data.
            </p>
          ) : (
            itens.map((a) => (
              <article
                key={a.id}
                className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border border-on-dark/12 bg-card/30 p-5 ${
                  a.status === "cancelado" ? "opacity-50" : ""
                }`}
              >
                <div>
                  <p className="font-display text-lg uppercase text-on-dark">
                    {hora(a.inicio)} – {hora(a.fim)} · {a.duracao_min} min
                  </p>
                  <p className="mt-1 text-sm text-on-dark-muted">
                    {a.cliente_nome} · {a.cliente_telefone}
                  </p>
                  <p className="text-sm text-on-dark-muted">
                    {a.servico} — {a.preco} · {a.barbeiro}
                  </p>
                </div>
                {a.status === "cancelado" ? (
                  <span className="text-sm uppercase text-on-dark-muted">Cancelado</span>
                ) : (
                  <Button variant="quiet" size="pill" onClick={() => void cancelar(a.id)}>
                    Cancelar
                  </Button>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
