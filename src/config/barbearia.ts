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

// Preços são valores de EXEMPLO — edite livremente.
export const SERVICOS = [
  { nome: "Corte Masculino", desc: "Corte na tesoura ou máquina, finalizado com acabamento preciso.", preco: "R$ 45" },
  { nome: "Corte + Barba", desc: "O combo completo: visual alinhado do cabelo à barba.", preco: "R$ 75" },
  { nome: "Barba", desc: "Toalha quente, navalha e desenho sob medida para o seu rosto.", preco: "R$ 35" },
  { nome: "Acabamento", desc: "Retoque de pezinho e contornos para manter o corte em dia.", preco: "R$ 25" },
  { nome: "Corte Infantil", desc: "Atendimento com paciência e cuidado para os pequenos.", preco: "R$ 40" },
  { nome: "Sobrancelha", desc: "Limpeza e alinhamento discreto, com traço natural.", preco: "R$ 20" },
];

export const BARBEIROS = ["Renato Matos", "Equipe Renato Matos"]; // <-- EDITÁVEL

// Depoimentos DEMONSTRATIVOS — substitua pelas avaliações reais.
export const AVALIACOES = [
  { nome: "Cliente exemplo", texto: "Texto demonstrativo de avaliação. Substitua por um depoimento real de cliente." },
  { nome: "Cliente exemplo", texto: "Texto demonstrativo de avaliação. Substitua por um depoimento real de cliente." },
  { nome: "Cliente exemplo", texto: "Texto demonstrativo de avaliação. Substitua por um depoimento real de cliente." },
];
