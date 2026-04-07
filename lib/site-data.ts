import { EbookVolume, OrderRecord, Product, PurchaseMethod } from "@/lib/types";

export const collectionVolumes: EbookVolume[] = [
  {
    id: "tomo-1",
    number: 1,
    title: "Neuroplasticidad y cambio mental",
    authorFocus: ["Joe Dispenza", "Norman Doidge"],
    promise: "Entender como tu cerebro aprende, se adapta y puede reescribirse.",
    chapters: [
      "Que es la neuroplasticidad y por que importa",
      "Como se forman los circuitos mentales",
      "Identificar patrones automaticos",
      "Ejercicios para reentrenar foco y atencion",
    ],
    outcome: "Vas a dejar de ver tus habitos mentales como algo fijo.",
    releaseStatus: "published",
    releaseDate: "2026-04-07",
    deliveryNote: "Se envia apenas se confirma el pago durante la semana 1.",
  },
  {
    id: "tomo-2",
    number: 2,
    title: "Regulacion emocional",
    authorFocus: ["Marian Rojas Estape", "Daniel Goleman"],
    promise: "Aprender a bajar ansiedad, impulsividad y desgaste emocional.",
    chapters: [
      "Cortisol, estres y cuerpo",
      "Senales de saturacion emocional",
      "Tecnicas para regular en tiempo real",
      "Rutinas de recuperacion mental",
    ],
    outcome: "Mas calma, menos reactividad, mejores decisiones.",
    releaseStatus: "published",
    releaseDate: "2026-04-07",
    deliveryNote: "Se envia apenas se confirma el pago durante la semana 1.",
  },
  {
    id: "tomo-3",
    number: 3,
    title: "Identidad y habitos sostenibles",
    authorFocus: ["James Clear", "BJ Fogg"],
    promise: "Construir habitos desde identidad y sistemas, no desde culpa.",
    chapters: [
      "La identidad detras de cada habito",
      "Diseno del entorno",
      "Pequenas mejoras que se acumulan",
      "Como sostener consistencia sin agotarte",
    ],
    outcome: "Una rutina que si se puede mantener en la vida real.",
    releaseStatus: "scheduled",
    releaseDate: "2026-04-14",
    deliveryNote: "Se enviara automaticamente en la semana 2 a quienes hayan comprado la coleccion anticipada.",
  },
  {
    id: "tomo-4",
    number: 4,
    title: "Psicologia positiva con base real",
    authorFocus: ["Martin Seligman", "Tal Ben-Shahar"],
    promise: "Pasar de motivacion pasajera a bienestar entrenable.",
    chapters: [
      "Que dice la evidencia sobre bienestar",
      "Fortalezas personales y energia mental",
      "Gratitud, proposito y resiliencia",
      "Practicas concretas para elevar el animo",
    ],
    outcome: "Mas bienestar cotidiano, sin caer en positivismo vacio.",
    releaseStatus: "scheduled",
    releaseDate: "2026-04-21",
    deliveryNote: "Se enviara automaticamente en la semana 3 a quienes hayan comprado la coleccion anticipada.",
  },
  {
    id: "tomo-5",
    number: 5,
    title: "Relaciones, apego y limites",
    authorFocus: ["Sue Johnson", "Amir Levine"],
    promise: "Entender por que tus vinculos impactan tu salud mental.",
    chapters: [
      "Apego y seguridad emocional",
      "Patrones relacionales repetidos",
      "Comunicacion emocional clara",
      "Limites sanos sin culpa",
    ],
    outcome: "Vinculos mas seguros y menos desgaste emocional.",
    releaseStatus: "scheduled",
    releaseDate: "2026-04-28",
    deliveryNote: "Se enviara automaticamente en la semana 4 a quienes hayan comprado la coleccion anticipada.",
  },
  {
    id: "tomo-6",
    number: 6,
    title: "Proposito, sentido y direccion",
    authorFocus: ["Viktor Frankl", "Carl Jung"],
    promise: "Reordenar tu vida desde sentido interno y no desde ruido externo.",
    chapters: [
      "Vacio, crisis y busqueda de sentido",
      "Simbolos, identidad y autoconocimiento",
      "Como construir una brujula personal",
      "Plan de accion con intencion",
    ],
    outcome: "Mas claridad para decidir hacia donde queres ir.",
    releaseStatus: "scheduled",
    releaseDate: "2026-05-05",
    deliveryNote: "Se enviara automaticamente en la semana 5 a quienes hayan comprado la coleccion anticipada.",
  },
  {
    id: "tomo-7",
    number: 7,
    title: "Plan de integracion de 30 dias",
    authorFocus: ["Sintesis aplicada NeuroBalance"],
    promise: "Convertir teoria en un sistema diario de cambio personal.",
    chapters: [
      "Mapa de implementacion",
      "Ritual diario de 15 minutos",
      "Seguimiento semanal",
      "Ajustes para sostener resultados",
    ],
    outcome: "Un puente claro entre leer, aplicar y sostener cambios.",
    releaseStatus: "scheduled",
    releaseDate: "2026-05-12",
    deliveryNote: "Se enviara automaticamente en la semana 6 a quienes hayan comprado la coleccion anticipada.",
  },
];

export const mainProduct: Product = {
  id: "neurobalance-coleccion-7-tomos",
  slug: "coleccion-7-tomos",
  name: "Coleccion NeuroBalance de 7 tomos",
  shortDescription:
    "Guias digitales disenadas con rigor cientifico para reprogramar tu mente, construir habitos duraderos y alcanzar el equilibrio emocional que mereces.",
  heroPrice: "Precio promocional anticipado: ARS 29.900",
  arsAmount: 29900,
  usdAmount: 29,
  format: "PDFs digitales",
  delivery: "2 tomos en la semana 1 y luego 1 por semana",
  releaseModel: "Semana 1 se entregan tomo 1 y 2. Desde la semana 2 se entrega 1 tomo por semana hasta completar los 7.",
  supportChannels: ["Email", "WhatsApp", "Instagram"],
  volumes: collectionVolumes,
  bonuses: [
    "Precio anticipado de lanzamiento para la coleccion completa",
    "Checklist de implementacion de 30 dias",
    "Guia rapida de habitos y regulacion emocional",
  ],
};

export const purchaseMethods: PurchaseMethod[] = [
  {
    provider: "mercadopago",
    title: "Argentina",
    badge: "Mercado Pago",
    summary: "Paga con dinero en cuenta, debito, credito o cuotas segun disponibilidad.",
    buttonLabel: "Comprar con Mercado Pago",
    helper: "Flujo automatico ideal para ventas en Argentina.",
  },
  {
    provider: "transfer",
    title: "Transferencia",
    badge: "Soporte manual",
    summary: "Completas tus datos, envias comprobante y activamos el acceso sin friccion innecesaria.",
    buttonLabel: "Reservar por transferencia",
    helper: "Canal secundario para quien no puede usar Mercado Pago.",
  },
];

export const trustPoints = [
  "Garantia 30 dias",
  "Entrega semanal sin perder el precio promocional",
  "Pago 100% seguro con Mercado Pago o transferencia",
  "Soporte humano solo si hace falta",
];

export const faqs = [
  {
    question: "Que recibo apenas pago?",
    answer:
      "Recibes de inmediato los tomos 1 y 2 de la semana 1. Luego se te envia 1 tomo por semana hasta completar la coleccion de 7.",
  },
  {
    question: "La coleccion se puede comprar cuando ya esten los 7 tomos completos?",
    answer:
      "Si. La coleccion completa se puede seguir comprando tambien cuando ya esten publicados los 7 tomos.",
  },
  {
    question: "Tengo que hablar por WhatsApp para comprar?",
    answer:
      "No. WhatsApp queda como canal de soporte y reenvio. El flujo principal de compra es directo desde la web.",
  },
  {
    question: "Que pasa si no encuentro el mail o necesito reenvio?",
    answer:
      "Se puede reenviar desde admin o atender manualmente por email, WhatsApp o Instagram sin cambiar el flujo principal.",
  },
];

export const launchChecklist = [
  "Cobro automatico por Mercado Pago",
  "Transferencia como respaldo",
  "Entrega inmediata de 2 tomos en la semana 1",
  "Envio semanal de 1 tomo hasta completar los 7",
  "Reenvio manual desde admin cuando haga falta",
];

export const mockOrders: OrderRecord[] = [
  {
    id: "ord_1001",
    customerEmail: "cliente1@ejemplo.com",
    customerName: "Maria Lopez",
    productSlug: mainProduct.slug,
    provider: "mercadopago",
    status: "paid",
    amount: mainProduct.arsAmount,
    currency: "ARS",
    createdAt: "2026-04-06T12:00:00.000Z",
  },
  {
    id: "ord_1002",
    customerEmail: "cliente2@ejemplo.com",
    customerName: "Daniel Torres",
    productSlug: mainProduct.slug,
    provider: "mercadopago",
    status: "pending",
    amount: mainProduct.arsAmount,
    currency: "ARS",
    createdAt: "2026-04-06T12:15:00.000Z",
  },
  {
    id: "ord_1003",
    customerEmail: "cliente3@ejemplo.com",
    customerName: "Ana Rivas",
    productSlug: mainProduct.slug,
    provider: "transfer",
    status: "awaiting_transfer",
    amount: mainProduct.arsAmount,
    currency: "ARS",
    createdAt: "2026-04-06T12:22:00.000Z",
  },
];
