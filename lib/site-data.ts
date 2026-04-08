import { CheckoutProductOption, EbookVolume, OrderRecord, Product, PurchaseMethod } from "@/lib/types";

export const singleVolumePriceArs = 7999;
export const collectionPriceArs = 34999;
export const collectionListPriceArs = singleVolumePriceArs * 7;
export const collectionSavingsArs = collectionListPriceArs - collectionPriceArs;
export const collectionDiscountPct = Number(((collectionSavingsArs / collectionListPriceArs) * 100).toFixed(1));

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
    deliveryNote: "Disponible desde la primera entrega y tambien como tomo individual.",
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
    deliveryNote: "Disponible desde la primera entrega y tambien como tomo individual.",
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
    deliveryNote: "Forma parte de la segunda entrega junto al tomo 4 en la coleccion anticipada.",
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
    releaseDate: "2026-04-14",
    deliveryNote: "Forma parte de la segunda entrega junto al tomo 3 en la coleccion anticipada.",
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
    releaseDate: "2026-04-21",
    deliveryNote: "Forma parte de la tercera entrega junto al tomo 6 en la coleccion anticipada.",
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
    releaseDate: "2026-04-21",
    deliveryNote: "Forma parte de la tercera entrega junto al tomo 5 en la coleccion anticipada.",
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
    releaseDate: "2026-04-28",
    deliveryNote: "Se entrega solo en la cuarta etapa de la coleccion anticipada.",
  },
];

export const mainProduct: Product = {
  id: "neurobalance-coleccion-7-tomos",
  slug: "coleccion-7-tomos",
  name: "Coleccion anticipada NeuroBalance",
  shortDescription:
    "Biblioteca digital de bienestar mental con tomos individuales y una coleccion anticipada con precio preferencial.",
  heroPrice: "Coleccion anticipada: ARS 34.999",
  arsAmount: collectionPriceArs,
  usdAmount: 34,
  format: "PDFs digitales",
  delivery: "Tomos 1 y 2 en la primera entrega, 3 y 4 en la segunda, 5 y 6 en la tercera y 7 en la cuarta.",
  releaseModel:
    "La coleccion anticipada se entrega en 4 etapas: primero recibes los tomos 1 y 2, luego 3 y 4, despues 5 y 6, y al final el tomo 7.",
  supportChannels: ["Email", "WhatsApp", "Instagram"],
  volumes: collectionVolumes,
  bonuses: [
    "Precio anticipado para asegurar la coleccion completa",
    "Ahorro frente a comprar los 7 tomos por separado",
    "Acceso progresivo al recorrido completo NeuroBalance",
  ],
  purchaseMode: "collection",
  includedVolumeIds: collectionVolumes.map((volume) => volume.id),
};

export const volumeProducts: Product[] = collectionVolumes.map((volume) => ({
  id: `producto-${volume.id}`,
  slug: volume.id,
  name: `Tomo ${volume.number}: ${volume.title}`,
  shortDescription: volume.promise,
  heroPrice: `Tomo individual: ARS ${singleVolumePriceArs.toLocaleString("es-AR")}`,
  arsAmount: singleVolumePriceArs,
  usdAmount: 8,
  format: "PDF digital",
  delivery:
    volume.releaseStatus === "published"
      ? "Entrega disponible desde la confirmacion del pago."
      : `Se entrega apenas se libera el ${volume.releaseDate}.`,
  releaseModel:
    volume.releaseStatus === "published"
      ? "Accedes a este tomo de manera individual apenas se confirma el pago."
      : `Reservas este tomo hoy y lo recibes apenas llegue su fecha de liberacion: ${volume.releaseDate}.`,
  supportChannels: ["Email", "WhatsApp", "Instagram"],
  volumes: [volume],
  bonuses: [
    "Compra puntual por tema",
    "Mismo enfoque editorial NeuroBalance",
    "Ideal para armar tu propia biblioteca",
  ],
  purchaseMode: "single",
  includedVolumeIds: [volume.id],
}));

export const productCatalog: Product[] = [mainProduct, ...volumeProducts];

export const checkoutProductOptions: CheckoutProductOption[] = [
  {
    slug: mainProduct.slug,
    label: "Coleccion anticipada",
    priceLabel: `ARS ${mainProduct.arsAmount.toLocaleString("es-AR")}`,
    summary: `Los 7 tomos con ${collectionDiscountPct}% de ahorro y entrega en 4 etapas.`,
  },
  ...volumeProducts.map((product, index) => ({
    slug: product.slug,
    label: `Tomo ${index + 1}`,
    priceLabel: `ARS ${product.arsAmount.toLocaleString("es-AR")}`,
    summary: product.name,
  })),
];

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export function getVolumesForProductSlug(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) {
    return [];
  }

  return collectionVolumes.filter((volume) => product.includedVolumeIds.includes(volume.id));
}

export const purchaseMethods: PurchaseMethod[] = [
  {
    provider: "mercadopago",
    title: "Argentina",
    badge: "Mercado Pago",
    summary: "Paga con dinero en cuenta, debito, credito o cuotas segun disponibilidad.",
    buttonLabel: "Comprar ahora",
    helper: "Flujo automatico ideal para compras en Argentina.",
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
  "Tomo individual: ARS 7.999",
  "Coleccion anticipada: ARS 34.999",
  `Ahorro anticipado del ${collectionDiscountPct}%`,
  "Entrega progresiva en 4 etapas",
];

export const faqs = [
  {
    question: "Puedo comprar un solo tomo?",
    answer:
      "Si. Cada tomo puede comprarse por separado a ARS 7.999. La coleccion anticipada existe para quien quiere asegurar los 7 con mejor precio.",
  },
  {
    question: "Que recibo si compro la coleccion anticipada?",
    answer:
      "Recibes los tomos 1 y 2 en la primera entrega. Luego llegan 3 y 4 en la segunda, 5 y 6 en la tercera y el tomo 7 en la cuarta.",
  },
  {
    question: "Cuanto ahorro con la coleccion anticipada?",
    answer:
      `Comprar los 7 tomos por separado suma ARS ${collectionListPriceArs.toLocaleString("es-AR")}. La coleccion anticipada cuesta ARS ${collectionPriceArs.toLocaleString("es-AR")}, asi que ahorras ARS ${collectionSavingsArs.toLocaleString("es-AR")}.`,
  },
  {
    question: "Tengo que hablar por WhatsApp para comprar?",
    answer:
      "No para pagar desde la web. WhatsApp queda como soporte y como respaldo para coordinaciones manuales por transferencia.",
  },
];

export const launchChecklist = [
  "Cobro automatico por Mercado Pago",
  "Transferencia como respaldo",
  "Compra de tomos individuales",
  "Coleccion anticipada en 4 etapas",
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
    productSlug: "tomo-1",
    provider: "mercadopago",
    status: "pending",
    amount: singleVolumePriceArs,
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
