import { EXPEDIENTE, PASSO_MINUTOS } from "@/config/barbearia";

export type Ocupado = { inicio: string; fim: string };

function minutos(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export function paraHHMM(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Constrói um Date local a partir de "2026-08-29" e minutos do dia. */
export function dataLocal(iso: string, minutosDoDia: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1, 0, minutosDoDia, 0, 0);
}

export function diaDaSemana(iso: string) {
  return dataLocal(iso, 0).getDay();
}

/**
 * Gera os horários realmente livres para a data, considerando a duração do
 * serviço, o expediente do dia e os agendamentos já existentes do barbeiro.
 */
export function horariosDisponiveis(iso: string, duracaoMin: number, ocupados: Ocupado[]) {
  if (!iso || !duracaoMin) return [];
  const expediente = EXPEDIENTE[diaDaSemana(iso)];
  if (!expediente) return [];

  const abre = minutos(expediente.abre);
  const fecha = minutos(expediente.fecha);
  const agora = Date.now();

  const intervalos = ocupados.map((o) => ({
    inicio: new Date(o.inicio).getTime(),
    fim: new Date(o.fim).getTime(),
  }));

  const livres: string[] = [];
  for (let m = abre; m + duracaoMin <= fecha; m += PASSO_MINUTOS) {
    const inicio = dataLocal(iso, m).getTime();
    const fim = inicio + duracaoMin * 60_000;
    if (inicio < agora + 15 * 60_000) continue;
    const conflita = intervalos.some((o) => inicio < o.fim && fim > o.inicio);
    if (!conflita) livres.push(paraHHMM(m));
  }
  return livres;
}

export function formatarData(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function hojeISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
