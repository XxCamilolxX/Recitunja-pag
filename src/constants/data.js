export const APROVECHABLES = [
  {
    id: 1,
    title: "Plegadiza, Cartón y Bolsas",
    shortTitle: "Cartón y Bolsas",
    items: "Plegadiza, cajas de cartón, cubetas de huevo y bolsas plásticas.",
    color: "#C8A165", // Carton
    colorClass: "text-recycle-carton border-recycle-carton",
    bgClass: "bg-recycle-carton",
    icon: "fa-box",
    image: "/carton.png",
    details: "Las cajas de cartón deben estar desarmadas y secas. Las bolsas plásticas deben estar limpias y secas."
  },
  {
    id: 2,
    title: "Botellas Plásticas y Aceites",
    shortTitle: "Botellas Plásticas",
    items: "Botellas de gaseosa, jugos, té, licores y aceite.",
    color: "#4CAEE3", // Plastico
    colorClass: "text-recycle-plastico border-recycle-plastico",
    bgClass: "bg-recycle-plastico",
    icon: "fa-bottle-water",
    image: "/botella-plastica.png",
    details: "Enjuaga brevemente para retirar residuos dulces o grasos, escúrrelas y aplánalas para ahorrar espacio."
  },
  {
    id: 3,
    title: "Envases de Vidrio",
    shortTitle: "Vidrio",
    items: "Envases de vidrio, perfumes, cervezas, cafés y cremas.",
    color: "#7DC98F", // Vidrio
    colorClass: "text-recycle-vidrio border-recycle-vidrio",
    bgClass: "bg-recycle-vidrio",
    icon: "fa-wine-bottle",
    image: "/vidrio.png",
    details: "Los envases de vidrio son infinitamente reciclables. No rompas los frascos y retira las tapas de metal."
  },
  {
    id: 4,
    title: "Frascos de Plástico",
    shortTitle: "Frascos Detergente",
    items: "Frascos de detergente, limpiadores, shampoo y desodorantes.",
    color: "#4CAEE3", // Plastico
    colorClass: "text-recycle-plastico border-recycle-plastico",
    bgClass: "bg-recycle-plastico",
    icon: "fa-soap",
    image: "/frascos-de-plastico.png",
    details: "Limpia y seca los recipientes de aseo personal o de hogar para garantizar que no contaminen otros materiales."
  },
  {
    id: 5,
    title: "Metales y Ollas",
    shortTitle: "Metales y Ollas",
    items: "Aerosoles, varillas, ollas y cubiertos.",
    color: "#A0A0A0", // Metal
    colorClass: "text-recycle-metal border-recycle-metal",
    bgClass: "bg-recycle-metal",
    icon: "fa-utensils",
    image: "/olla.png",
    details: "Ollas viejas, cubiertos metálicos y varillas de metal son aprovechables. Asegúrate de que no tengan comida."
  },
  {
    id: 6,
    title: "Revistas, Libros y Periódicos",
    shortTitle: "Papel y Revistas",
    items: "Revistas, periódicos, libros y cuadernos.",
    color: "#F5D76E", // Papel
    colorClass: "text-recycle-papel border-recycle-papel",
    bgClass: "bg-recycle-papel",
    icon: "fa-newspaper",
    image: "/periodico.png",
    details: "Mantén el papel seco, libre de grasa, humedad o pegamento excesivo para facilitar su triturado y reciclaje."
  },
  {
    id: 7,
    title: "Latas de Bebida y Comida",
    shortTitle: "Latas Metálicas",
    items: "Latas de refrescos, cervezas, sardinas y atún.",
    color: "#A0A0A0", // Metal
    colorClass: "text-recycle-metal border-recycle-metal",
    bgClass: "bg-recycle-metal",
    icon: "fa-prescription-bottle",
    image: "/latas-de-bebidas.png",
    details: "Las latas de aluminio y hojalata son altamente valoradas. Enjuágalas brevemente, especialmente las de atún y sardinas."
  },
  {
    id: 8,
    title: "Tetra Pack y Plásticos Rígidos",
    shortTitle: "Tetra Pack y Pasta",
    items: "Cajas de leche, tapas plásticas, pasta, sillas, baldes y canecas.",
    color: "#C8A165", // Carton / Rígido
    colorClass: "text-recycle-carton border-recycle-carton",
    bgClass: "bg-recycle-carton",
    icon: "fa-blender",
    image: "/tetrapack.png",
    details: "Incluye cajas de leche (Tetra Pack) bien escurridas y secas, así como sillas de plástico rotas, baldes y canecas de pasta."
  },
  {
    id: 9,
    title: "Chatarra, Cobre y Bronce",
    shortTitle: "Chatarra y Cobre",
    items: "Chatarra, cobre y bronce.",
    color: "#A0A0A0", // Metal
    colorClass: "text-recycle-metal border-recycle-metal",
    bgClass: "bg-recycle-metal",
    icon: "fa-gears",
    image: "/cobre.png",
    details: "Metales de demolición o reparación hogareña como cables de cobre viejos, accesorios de bronce y chatarra en general."
  }
];

export const NO_APROVECHABLES = [
  { id: 1, text: "Icopor (poliestireno expandido)." },
  { id: 2, text: "Plásticos chirriones (envolturas, paquetes de frituras, galletas, confitería)." },
  { id: 3, text: "Plásticos de un solo uso (platos, vasos, cubiertos desechables, pitillos)." },
  { id: 4, text: "Residuos reciclables sucios, mojados o contaminados con comida/grasa." },
  { id: 5, text: "Madera o mueblería vieja." },
  { id: 6, text: "Vidrio plano (vidrios de ventanas, espejos, parabrisas)." },
  { id: 7, text: "Residuos sanitarios, biológicos o químicos (pañales, papel higiénico usado, tapabocas)." },
  { id: 8, text: "Ropa vieja, textiles o zapatos." }
];

export const TIPS_RECICLAJE = [
  {
    id: 1,
    emoji: "🧴",
    title: "Enjuaga antes de entregar",
    text: "Las bolsas plásticas, como las de las carnes o frascos de lácteos, requieren una pequeña enjuagada rápida. Debes dejarlas secar y luego entregarlas en la bolsa azul."
  },
  {
    id: 2,
    emoji: "🥚",
    title: "Cubetas de huevo impecables",
    text: "Las cubetas de cartón para huevos deben entregarse completamente limpias, sin rotos y sin estar aplastadas para facilitar su reutilización directa."
  },
  {
    id: 3,
    emoji: "🧃",
    title: "Manejo adecuado del Tetra Pack",
    text: "Las cajas de leche y jugos son bienvenidos. Abre las pestañas de las esquinas, aplánalas para que ocupen menos espacio, enjuágalas por dentro y déjalas secar antes de entregarlas."
  },
  {
    id: 4,
    emoji: "♻️",
    title: "Separar desde la fuente",
    text: "Mantén una bolsa azul destinada exclusivamente para los materiales aprovechables secos y limpios. Esto evita que se contaminen con los residuos húmedos u orgánicos."
  },
  {
    id: 5,
    emoji: "📦",
    title: "Cajas compactas",
    text: "Desarma y aplana todas las cajas de cartón. Esto optimiza el almacenamiento en tu hogar y facilita enormemente el transporte para los recicladores."
  }
];
