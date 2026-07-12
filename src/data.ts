import { Album, AISuggestion } from './types';

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'benidorm-2026',
    title: 'Vacaciones en Benidorm 2026',
    date: '15 - 30 Julio, 2026',
    location: 'Benidorm, España',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    description: 'Arena, risas y el eco del Mediterráneo',
    quote: 'Lo mejor no fue el destino, sino redescubrirnos entre helados y caminatas infinitas por el paseo marítimo.',
    quoteAuthor: 'CRÓNICAS DEL MEDITERRÁNEO',
    imagesCount: 124,
    videosCount: 12,
    companions: ['Familia', 'Amigos'],
    members: [
      { name: 'Maria Garcia', role: 'Creadora del álbum', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', online: true, typing: true },
      { name: 'Carlos Ruiz', role: 'Colaborador', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', online: true },
      { name: 'Ana López', role: 'Espectadora', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', online: true },
      { name: 'Abuela Carmen', role: 'Colaboradora', avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=100', online: false }
    ],
    chapters: [
      {
        id: 'ch1',
        chapterNum: 'Capítulo I',
        title: 'El Primer Amanecer',
        text: 'Llegamos a Benidorm cuando el sol apenas comenzaba a teñir de rosa los rascacielos. Había una calma inusual, solo rota por el murmullo rítmico de las olas rompiendo en la orilla de Levante. El olor a salitre nos recordó por qué volvemos aquí cada verano. Es esa mezcla de nostalgia y promesa lo que hace que cada viaje se sienta como el primero, una página en blanco esperando ser escrita.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
        imageSide: 'right'
      },
      {
        id: 'ch2',
        chapterNum: 'Capítulo II',
        title: 'Cenas en el Castillo',
        text: 'El Balcón del Mediterráneo nunca falla. Entre tapas y risas, vimos cómo las luces de la ciudad se encendían una a una, transformando el skyline en una constelación terrestre. Benidorm se transforma de noche en una joya brillante incrustada en la oscuridad del mar, recordándonos que la magia reside en los momentos compartidos.',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600',
        imageSide: 'left'
      }
    ],
    memories: [
      { id: 'm1', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400', caption: 'Primeros pasos en la arena...' },
      { id: 'm2', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400', caption: 'La cena de Navidad adelantada' },
      { id: 'm3', imageUrl: 'https://images.unsplash.com/photo-1534080391025-a17c0af14a7f?auto=format&fit=crop&q=80&w=400', caption: 'Esa deliciosa paella en el paseo' },
      { id: 'm4', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=400', caption: 'Paseando por las calles de piedra' }
    ],
    conversation: [
      {
        id: 'c1',
        author: 'Mamá (María)',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        message: '¡Qué día tan increíble hoy en la Cala del Tío Ximo! ¿Alguien guardó el vídeo de los niños saltando desde las rocas?',
        date: 'Sábado, 18 de Julio · 18:42'
      },
      {
        id: 'c2',
        author: 'Yo (Ana)',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
        message: '¡Aquí lo tengo! Los saltos fueron épicos 🤙',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        date: 'Sábado, 18 de Julio · 18:45'
      },
      {
        id: 'c3',
        author: 'Abuela Carmen',
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=100',
        date: 'Sábado, 18 de Julio · 19:10',
        isAudio: true,
        audioUrl: '#',
        audioDuration: '0:48',
        message: 'RECETA DE LA PAELLA - NOTAS'
      }
    ]
  },
  {
    id: 'interrail-2026',
    title: 'Interrail Verano 2026',
    date: '10 - 25 Julio, 2026',
    location: 'Praga, República Checa',
    coverImage: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?auto=format&fit=crop&q=80&w=800',
    description: 'Aventura mochilera por el corazón de Europa',
    quote: 'La aventura no está en el mapa, está en las risas perdidas en estaciones olvidadas.',
    quoteAuthor: 'MOCHILEROS 2026',
    imagesCount: 312,
    videosCount: 45,
    companions: ['Amigos', 'Compañeros'],
    members: [
      { name: 'Ana López', role: 'Creadora del álbum', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', online: true },
      { name: 'Carlos Ruiz', role: 'Colaborador', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' }
    ],
    chapters: [
      {
        id: 'ch1',
        chapterNum: 'Capítulo I',
        title: 'Estación de Praga',
        text: 'Nuestra primera parada oficial. Entre maletas pesadas y mapas desplegados, nos maravillamos con el Puente de Carlos iluminado al atardecer.',
        image: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?auto=format&fit=crop&q=80&w=600',
        imageSide: 'right'
      }
    ],
    memories: [
      { id: 'm1', imageUrl: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?auto=format&fit=crop&q=80&w=400', caption: 'Praga al amanecer' }
    ],
    conversation: [
      {
        id: 'c1',
        author: 'Carlos Ruiz',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        message: '¿Quién tiene los billetes de tren físicos?',
        date: 'Lunes, 13 de Julio · 10:15'
      }
    ]
  },
  {
    id: 'navidad-pueblo',
    title: 'Navidad en el Pueblo',
    date: '20 - 28 Diciembre, 2025',
    location: 'Zamora, España',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    description: 'Frío fuera, chimenea y familia dentro',
    quote: 'El mejor abrigo siempre es la mesa compartida.',
    quoteAuthor: 'FAMILIA GARCÍA',
    imagesCount: 89,
    videosCount: 5,
    companions: ['Familia'],
    members: [
      { name: 'Maria Garcia', role: 'Creadora del álbum', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', online: true },
      { name: 'Abuela Carmen', role: 'Colaboradora', avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=100' }
    ],
    chapters: [
      {
        id: 'ch1',
        chapterNum: 'Capítulo I',
        title: 'El calor del hogar',
        text: 'Llegar con el frío de Zamora y encontrar la chimenea encendida por el abuelo fue la mejor bienvenida posible.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
        imageSide: 'right'
      }
    ],
    memories: [
      { id: 'm1', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400', caption: 'Alrededor del fuego' }
    ],
    conversation: [
      {
        id: 'c1',
        author: 'Abuela Carmen',
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=100',
        message: 'Qué alegría teneros a todos en casa este año.',
        date: 'Jueves, 24 de Diciembre · 21:00'
      }
    ]
  }
];

export const INITIAL_SUGGESTIONS: AISuggestion[] = [
  {
    id: 's1',
    type: 'face',
    title: 'Identificar Rostro',
    description: '¿Es "Abuelo Manuel" la persona que aparece en el centro de esta foto de la cena?',
    targetAlbum: 'benidorm-2026',
    targetImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 's2',
    type: 'date',
    title: 'Confirmar Fecha',
    description: 'Hemos detectado que 12 fotografías sin fecha podrían ser del 18 de Julio de 2026.',
    targetAlbum: 'benidorm-2026'
  },
  {
    id: 's3',
    type: 'duplicate',
    title: 'Fotos Similares',
    description: 'Hay 3 fotos del amanecer en la playa muy parecidas. ¿Quieres conservar solo la mejor?',
    targetAlbum: 'benidorm-2026'
  }
];
