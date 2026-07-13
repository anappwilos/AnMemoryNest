/**
 * MemoryNest - Registro de Enlaces de Imágenes del Proyecto
 * 
 * Este archivo centraliza todas las URLs de imágenes estáticas, avatares
 * y recursos visuales de Unsplash utilizados en el diseño del proyecto.
 */

export const PROJECT_IMAGES = {
  // Portadas y Fondos
  LANDING: {
    HERO_TRAVEL: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    HERO_FAMILY: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600',
    LOGIN_BACKGROUND: 'https://images.unsplash.com/photo-1595981234969-8259b94fde88?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    REGISTER_BACKGROUND: 'https://images.unsplash.com/photo-1627353802076-bd439e09244b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },

  // Categorías Generales de Álbumes
  COVERS: {
    TRAVEL_SUNSET: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800',
    FAMILY_DINNER: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
  },

  // Recuerdos de Viajes
  TRAVEL: {
    SUNSET: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800',
    ROAD_TRIP: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    TRAIN_STATION: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800',
    PLANE_VIEW: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    SUMMER_DRINKS: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800',
  },

  // Recuerdos de Familia
  FAMILY: {
    DINNER: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
    SUNDAY_LUNCH: 'https://images.unsplash.com/photo-1595981234969-8259b94fde88?auto=format&fit=crop&q=80&w=800',
    HUG: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
    GRANDPA_GAMES: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
    BIRTHDAY: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
  },

  // Miembros / Avatares
  AVATARS: {
    DEFAULT: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    CARLOS: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    SANTI: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100',
    LAURA: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
    ABUELA_CARMEN: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=100',
    MAMA_MARIA: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    ABUELO_MANUEL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    PAPA_ROBERTO: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=100',
    DEFAULT_FEMALE: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    DEFAULT_MALE: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
  }
};

export interface ImageRegistryEntry {
  url: string;
  name: string;
  category: 'portada' | 'recuerdo' | 'avatar';
  description: string;
}

// Catálogo completo listo para listar a nivel de código
export const IMAGE_CATALOGUE: ImageRegistryEntry[] = [
  {
    url: PROJECT_IMAGES.COVERS.TRAVEL_SUNSET,
    name: 'Puesta de Sol Interrail',
    category: 'portada',
    description: 'Puesta de sol espectacular desde las costas del sur de Europa'
  },
  {
    url: PROJECT_IMAGES.COVERS.FAMILY_DINNER,
    name: 'Cena de Año Nuevo',
    category: 'portada',
    description: 'Cena familiar de fin de año reuniendo tres generaciones'
  },
  {
    url: PROJECT_IMAGES.TRAVEL.ROAD_TRIP,
    name: 'Viaje por Carretera',
    category: 'recuerdo',
    description: 'Carreteras infinitas cruzando parajes espectaculares'
  },
  {
    url: PROJECT_IMAGES.TRAVEL.TRAIN_STATION,
    name: 'Estación de Tren',
    category: 'recuerdo',
    description: 'Planeando la siguiente parada del tren en Interrail'
  },
  {
    url: PROJECT_IMAGES.TRAVEL.PLANE_VIEW,
    name: 'Vista de Avión',
    category: 'recuerdo',
    description: 'Amanecer dorado desde las nubes en pleno vuelo'
  },
  {
    url: PROJECT_IMAGES.TRAVEL.SUMMER_DRINKS,
    name: 'Brindis de Verano',
    category: 'recuerdo',
    description: 'Risas infinitas y cócteles de verano'
  },
  {
    url: PROJECT_IMAGES.FAMILY.SUNDAY_LUNCH,
    name: 'Almuerzo de Domingo',
    category: 'recuerdo',
    description: 'Risas, comida rica y anécdotas compartidas en el comedor familiar'
  },
  {
    url: PROJECT_IMAGES.FAMILY.HUG,
    name: 'Abrazo Familiar Dulce',
    category: 'recuerdo',
    description: 'Momentos de ternura e incondicionalidad familiar'
  },
  {
    url: PROJECT_IMAGES.FAMILY.GRANDPA_GAMES,
    name: 'Juegos con el Abuelo',
    category: 'recuerdo',
    description: 'Abuelo enseñando pacientemente juegos clásicos tradicionales'
  },
  {
    url: PROJECT_IMAGES.FAMILY.BIRTHDAY,
    name: 'Globos de Cumpleaños',
    category: 'recuerdo',
    description: 'Festejos coloridos con pasteles y globos'
  },
  {
    url: PROJECT_IMAGES.AVATARS.DEFAULT,
    name: 'Avatar Genérico de Usuario',
    category: 'avatar',
    description: 'Avatar neutral para el perfil de usuario'
  },
  {
    url: PROJECT_IMAGES.AVATARS.CARLOS,
    name: 'Avatar de Carlos',
    category: 'avatar',
    description: 'Avatar para Carlos Ruiz, aventurero y hermano'
  },
  {
    url: PROJECT_IMAGES.AVATARS.SANTI,
    name: 'Avatar de Santi',
    category: 'avatar',
    description: 'Avatar para Santi Martínez, fotógrafo oficial'
  },
  {
    url: PROJECT_IMAGES.AVATARS.LAURA,
    name: 'Avatar de Laura',
    category: 'avatar',
    description: 'Avatar para Laura Gómez, organizadora de rutas'
  },
  {
    url: PROJECT_IMAGES.AVATARS.ABUELA_CARMEN,
    name: 'Avatar de la Abuela Carmen',
    category: 'avatar',
    description: 'Avatar de la entrañable matriarca de la familia'
  },
  {
    url: PROJECT_IMAGES.AVATARS.MAMA_MARIA,
    name: 'Avatar de Mamá María',
    category: 'avatar',
    description: 'Avatar de la co-organizadora de eventos familiares'
  },
  {
    url: PROJECT_IMAGES.AVATARS.ABUELO_MANUEL,
    name: 'Avatar del Abuelo Manuel',
    category: 'avatar',
    description: 'Avatar para el recordado guardián del legado familiar'
  },
  {
    url: PROJECT_IMAGES.AVATARS.PAPA_ROBERTO,
    name: 'Avatar de Papá Roberto',
    category: 'avatar',
    description: 'Avatar para el asador oficial y especialista en risas'
  }
];
