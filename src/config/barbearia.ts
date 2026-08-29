// ============================================================
// EDITE AQUI os dados da barbearia (telefone, preços, textos).
// ============================================================

export const CONTATO = {
  whatsapp: "5511999999999", // <-- EDITÁVEL: número com DDI+DDD, só números
  telefoneExibicao: "(11) 99999-9999", // <-- EDITÁVEL
  endereco: "Rua Exemplo, 123 - Centro", // <-- EDITÁVEL
  cidade: "Sua Cidade - UF", // <-- EDITÁVEL
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Renato+Matos+Barbearia", // <-- EDITÁVEL
  instagram: "@renatomatosbarbearia", // <-- EDITÁVEL
};

export const HORARIOS = [
  { dia: "Segunda a Sexta", hora: "09:00 – 20:00" }, // <-- EDITÁVEL
  { dia: "Sábado", hora: "08:00 – 19:00" }, // <-- EDITÁVEL
  { dia: "Domingo", hora: "Fechado" }, // <-- EDITÁVEL
];

// Números da seção "Sobre" — EDITÁVEIS
export const NUMEROS = [
  { valor: "—", label: "Anos de barbearia" },
  { valor: "—", label: "Clientes atendidos" },
  { valor: "5.0", label: "Nota dos clientes" },
];

// Catálogo de serviços — nome, preço e duração (em minutos).
// A duração é usada para calcular automaticamente os horários disponíveis.
export type Servico = {
  nome: string;
  preco: string;
  duracaoMin: number;
  aPartirDe?: boolean;
  desc?: string;
};

export const SERVICOS: Servico[] = [
  { nome: "1.6 - Corte, Selagem, Hidratação", preco: "R$ 130,00", duracaoMin: 75 },
  { nome: "1.7 - Corte, Luzes, Hidratação", preco: "R$ 130,00", duracaoMin: 60, aPartirDe: true },
  { nome: "Pacote de Corte Semanal", preco: "R$ 106,00", duracaoMin: 30 },
  { nome: "0.5 - Selagem/Botox", preco: "R$ 100,00", duracaoMin: 60, aPartirDe: true },
  { nome: "Abordagem Visagista", preco: "R$ 90,00", duracaoMin: 60 },
  { nome: "1 - Dois Cortes Masculinos", preco: "R$ 80,00", duracaoMin: 60 },
  { nome: "1.1.1 - Corte e Barboterapia", preco: "R$ 80,00", duracaoMin: 60 },
  { nome: "1.2 - Corte, Barba, Sobrancelha", preco: "R$ 80,00", duracaoMin: 60 },
  { nome: "1.8.1 - Corte com Pigmentação", preco: "R$ 75,00", duracaoMin: 45 },
  { nome: "2.1 - Barba Pigmentada", preco: "R$ 75,00", duracaoMin: 45 },
  { nome: "1.1 - Corte, Barba no Vapor de Ozônio", preco: "R$ 70,00", duracaoMin: 60 },
  { nome: "1.8 - Corte, Bigode, Sobrancelha", preco: "R$ 60,00", duracaoMin: 30 },
  { nome: "2.4 - Barba e Pezinho", preco: "R$ 55,00", duracaoMin: 30 },
  { nome: "1.3 - Corte, Sobrancelha", preco: "R$ 50,00", duracaoMin: 30 },
  { nome: "1.4 - Corte, Hidratação", preco: "R$ 50,00", duracaoMin: 45 },
  { nome: "2.0 - Barboterapia Completa", preco: "R$ 50,00", duracaoMin: 30 },
  { nome: "2.3 - Barba, Sobrancelha", preco: "R$ 50,00", duracaoMin: 30 },
  { nome: "Corte Feminino", preco: "R$ 50,00", duracaoMin: 30 },
  { nome: "1 - Corte Masculino", preco: "R$ 40,00", duracaoMin: 30 },
  { nome: "2 - Barba no Vapor de Ozônio", preco: "R$ 40,00", duracaoMin: 30 },
  { nome: "Hidratação", preco: "R$ 35,00", duracaoMin: 15 },
  { nome: "Pigmentação", preco: "R$ 35,00", duracaoMin: 15 },
  { nome: "2.2 - Hidratação na Barba", preco: "R$ 30,00", duracaoMin: 15 },
  { nome: "Limpeza Facial", preco: "R$ 30,00", duracaoMin: 15 },
  { nome: "Depilação de Nariz/Orelha", preco: "R$ 25,00", duracaoMin: 15 },
  { nome: "Pezinho", preco: "R$ 20,00", duracaoMin: 15 },
  { nome: "Sobrancelha", preco: "R$ 10,00", duracaoMin: 15 },
];

export function precoExibicao(s: Servico) {
  return s.aPartirDe ? `A partir de ${s.preco}` : s.preco;
}

// Expediente usado para gerar automaticamente os horários (0 = domingo).
// null = fechado. Passo dos horários em minutos.
export const EXPEDIENTE: Record<number, { abre: string; fecha: string } | null> = {
  0: null,
  1: { abre: "09:00", fecha: "20:00" },
  2: { abre: "09:00", fecha: "20:00" },
  3: { abre: "09:00", fecha: "20:00" },
  4: { abre: "09:00", fecha: "20:00" },
  5: { abre: "09:00", fecha: "20:00" },
  6: { abre: "08:00", fecha: "19:00" },
};

export const PASSO_MINUTOS = 15; // <-- EDITÁVEL


export const BARBEIROS = ["Renato Matos", "Equipe Renato Matos"]; // <-- EDITÁVEL

// Depoimentos DEMONSTRATIVOS — substitua pelas avaliações reais.
export const AVALIACOES = [
  { nome: "Cliente exemplo", texto: "Texto demonstrativo de avaliação. Substitua por um depoimento real de cliente." },
  { nome: "Cliente exemplo", texto: "Texto demonstrativo de avaliação. Substitua por um depoimento real de cliente." },
  { nome: "Cliente exemplo", texto: "Texto demonstrativo de avaliação. Substitua por um depoimento real de cliente." },
];
