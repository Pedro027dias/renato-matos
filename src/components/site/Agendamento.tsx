import { useEffect, useMemo, useState } from "react";
import { CalendarClock, Check, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { BARBEIROS, CONTATO, SERVICOS, precoExibicao } from "@/config/barbearia";
import { supabase } from "@/integrations/supabase/client";
import { dataLocal, formatarData, hojeISO, horariosDisponiveis, type Ocupado } from "@/lib/agenda";

export function Agendamento() {
  const [servicoNome, setServicoNome] = useState(SERVICOS[0]!.nome);
  const [barbeiro, setBarbeiro] = useState(BARBEIROS[0]!);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ocupados, setOcupados] = useState<Ocupado[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const servico = useMemo(
    () => SERVICOS.find((s) => s.nome === servicoNome) ?? SERVICOS[0]!,
    [servicoNome],
  );

  // Busca os horários já ocupados do barbeiro naquele dia
  useEffect(() => {
    if (!data || !barbeiro) {
      setOcupados([]);
      return;
    }
    let ativo = true;
    setCarregando(true);
    supabase
      .rpc("horarios_ocupados", { _barbeiro: barbeiro, _dia: data })
      .then(({ data: rows, error }) => {
        if (!ativo) return;
        if (error) {
          toast.error("Não foi possível carregar os horários.");
          setOcupados([]);
        } else {
          setOcupados((rows ?? []) as Ocupado[]);
        }
        setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, [data, barbeiro, confirmado]);

  const slots = useMemo(
    () => horariosDisponiveis(data, servico.duracaoMin, ocupados),
    [data, servico.duracaoMin, ocupados],
  );

  useEffect(() => {
    if (hora && !slots.includes(hora)) setHora("");
  }, [slots, hora]);

  const completo = Boolean(
    servicoNome && barbeiro && data && hora && nome.trim().length >= 2 && telefone.trim().length >= 8,
  );

  async function agendar() {
    if (!completo || enviando) return;
    setEnviando(true);
    const [h, m] = hora.split(":").map(Number);
    const inicio = dataLocal(data, (h ?? 0) * 60 + (m ?? 0));

    const { error } = await supabase.rpc("criar_agendamento", {
      _cliente_nome: nome.trim(),
      _cliente_telefone: telefone.trim(),
      _barbeiro: barbeiro,
      _servico: servico.nome,
      _preco: precoExibicao(servico),
      _duracao_min: servico.duracaoMin,
      _inicio: inicio.toISOString(),
      _observacoes: null,
    });
    setEnviando(false);

    if (error) {
      const msg = error.message.includes("indisponível")
        ? "Esse horário acabou de ser reservado. Escolha outro."
        : "Não foi possível concluir o agendamento. Tente novamente.";
      toast.error(msg);
      setConfirmado((v) => !v); // recarrega horários
      return;
    }

    setConfirmado(true);
    setHora("");
    toast.success("Agendamento confirmado! O horário já está reservado.");
  }

  const mensagem = encodeURIComponent(
    `Olá, Renato Matos Barbearia! Acabei de agendar pelo site.\n\n` +
      `• Nome: ${nome}\n` +
      `• Serviço: ${servico.nome} (${servico.duracaoMin} min)\n` +
      `• Valor: ${precoExibicao(servico)}\n` +
      `• Barbeiro: ${barbeiro}\n` +
      `• Data: ${formatarData(data)}\n` +
      `• Horário: ${hora}`,
  );
  const link = `https://wa.me/${CONTATO.whatsapp}?text=${mensagem}`;

  const fieldLabel = "eyebrow mb-3 block text-on-dark-muted";
  const selectClass =
    "h-13 w-full rounded-lg border border-on-dark/20 bg-on-dark/5 px-4 py-3 text-on-dark outline-none transition-colors focus:border-accent";

  return (
    <section id="agendamento" className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="text-center">
          <span className="eyebrow text-accent">Agendamento</span>
          <h2 className="mt-4 text-3xl font-semibold uppercase text-on-dark sm:text-5xl">
            Reserve sua cadeira
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-on-dark-muted">
            Escolha o serviço e o profissional: o sistema mostra apenas os horários realmente livres
            e reserva a sua vaga na hora.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-on-dark/12 bg-card/40 p-6 shadow-lift sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={fieldLabel} htmlFor="nome">
                Seu nome
              </label>
              <input
                id="nome"
                className={selectClass}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome completo"
              />
            </div>

            <div>
              <label className={fieldLabel} htmlFor="telefone">
                WhatsApp
              </label>
              <input
                id="telefone"
                inputMode="tel"
                className={selectClass}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className={fieldLabel} htmlFor="servico">
                Serviço
              </label>
              <select
                id="servico"
                className={selectClass}
                value={servicoNome}
                onChange={(e) => setServicoNome(e.target.value)}
              >
                {SERVICOS.map((s) => (
                  <option key={s.nome} value={s.nome} className="text-foreground">
                    {s.nome} — {precoExibicao(s)} · {s.duracaoMin} min
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={fieldLabel} htmlFor="barbeiro">
                Barbeiro
              </label>
              <select
                id="barbeiro"
                className={selectClass}
                value={barbeiro}
                onChange={(e) => setBarbeiro(e.target.value)}
              >
                {BARBEIROS.map((b) => (
                  <option key={b} value={b} className="text-foreground">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={fieldLabel} htmlFor="data">
                Data
              </label>
              <input
                id="data"
                type="date"
                min={hojeISO()}
                className={selectClass}
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8">
            <span className={fieldLabel}>
              Horários disponíveis {data ? `· ${servico.duracaoMin} min` : ""}
            </span>
            {!data ? (
              <p className="text-sm text-on-dark-muted">Escolha uma data para ver os horários.</p>
            ) : carregando ? (
              <p className="flex items-center gap-2 text-sm text-on-dark-muted">
                <Loader2 className="size-4 animate-spin" /> Carregando horários…
              </p>
            ) : slots.length === 0 ? (
              <p className="text-sm text-on-dark-muted">
                Nenhum horário livre nessa data para este serviço. Tente outro dia.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {slots.map((h) => {
                  const ativo = hora === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHora(h)}
                      className={`flex h-12 items-center justify-center rounded-lg border font-display text-sm tracking-widest transition-all ${
                        ativo
                          ? "border-accent bg-accent text-accent-foreground shadow-soft"
                          : "border-on-dark/20 text-on-dark-muted hover:border-on-dark/50 hover:text-on-dark"
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-on-dark/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-on-dark-muted">
              {completo ? (
                <Check className="size-4 shrink-0 text-accent" />
              ) : (
                <CalendarClock className="size-4 shrink-0" />
              )}
              {completo
                ? `${servico.nome} · ${barbeiro} · ${formatarData(data)} às ${hora}`
                : "Preencha nome, WhatsApp, serviço, data e horário."}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="accent" size="pillLg" disabled={!completo || enviando} onClick={agendar}>
                {enviando ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                Confirmar agendamento
              </Button>
              {confirmado ? (
                <Button variant="quiet" size="pillLg" asChild>
                  <a href={link} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    Avisar no WhatsApp
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
