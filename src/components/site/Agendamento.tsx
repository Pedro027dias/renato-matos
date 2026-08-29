import { useState } from "react";
import { CalendarClock, Check, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BARBEIROS, CONTATO, SERVICOS } from "@/config/barbearia";

const HORARIOS_DISPONIVEIS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

function formatarData(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function Agendamento() {
  const [servico, setServico] = useState(SERVICOS[0]!.nome);
  const [barbeiro, setBarbeiro] = useState(BARBEIROS[0]!);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  const completo = Boolean(servico && barbeiro && data && hora);

  const mensagem = encodeURIComponent(
    `Olá, Renato Matos Barbearia! Gostaria de agendar um horário.\n\n` +
      `• Serviço: ${servico}\n` +
      `• Barbeiro: ${barbeiro}\n` +
      `• Data: ${formatarData(data)}\n` +
      `• Horário: ${hora}\n\n` +
      `Pode confirmar, por favor?`,
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
            Escolha o serviço, o profissional e o melhor horário. A confirmação é feita direto pelo
            WhatsApp.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-on-dark/12 bg-card/40 p-6 shadow-lift sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={fieldLabel} htmlFor="servico">
                Serviço
              </label>
              <select
                id="servico"
                className={selectClass}
                value={servico}
                onChange={(e) => setServico(e.target.value)}
              >
                {SERVICOS.map((s) => (
                  <option key={s.nome} value={s.nome} className="text-foreground">
                    {s.nome} — {s.preco}
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
                className={selectClass}
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-8">
            <span className={fieldLabel}>Horário</span>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {HORARIOS_DISPONIVEIS.map((h) => {
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
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-on-dark/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-on-dark-muted">
              {completo ? (
                <Check className="size-4 shrink-0 text-accent" />
              ) : (
                <CalendarClock className="size-4 shrink-0" />
              )}
              {completo
                ? `${servico} · ${barbeiro} · ${formatarData(data)} às ${hora}`
                : "Selecione serviço, barbeiro, data e horário."}
            </p>

            {completo ? (
              <Button variant="accent" size="pillLg" asChild>
                <a href={link} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  Confirmar pelo WhatsApp
                </a>
              </Button>
            ) : (
              <Button variant="accent" size="pillLg" disabled>
                <MessageCircle className="size-4" />
                Confirmar pelo WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
