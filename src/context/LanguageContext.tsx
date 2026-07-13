import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, replacements?: Record<string, string | number>) => string;
}

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      legacy: 'Legado Digital',
      notifications: 'Notificaciones',
      markAllRead: 'Marcar todo',
      profile: 'Mi Perfil y Legado',
      settings: 'Ajustes',
      logout: 'Cerrar Sesión',
    },
    landing: {
      title: 'No guardes solo fotos.',
      titleItalic: 'Preserva las historias',
      titleSuffix: ' detrás de ellas.',
      description: 'La primera cápsula del tiempo inteligente diseñada para capturar la voz, las emociones y los relatos que hacen que cada recuerdo familiar sea único.',
      startBtn: 'Comenzar',
      christmasCaption: 'La cena de Navidad, 1988',
      interrailCaption: 'Interrail 2026',
    },
    dashboard: {
      title: 'Tu Baúl de Recuerdos',
      subtitle: 'Preserva y revive tu historia familiar',
      searchPlaceholder: 'Buscar recuerdos o álbumes...',
      allCategories: 'Todas las Categorías',
      categoryTravel: 'Viajes',
      categoryFamily: 'Familia',
      categoryHeritage: 'Legado / Historia',
      categoryFriends: 'Amigos',
      categoryColleagues: 'Compañeros',
      allCompanions: 'Todos los Acompañantes',
      noAlbums: 'No se encontraron recuerdos',
      noAlbumsDesc: 'Crea un nuevo álbum o ajusta tus filtros de búsqueda.',
      addMemoryBtn: 'Añadir Recuerdo',
      addMemoryDesc: 'Tienes tus recuerdos compartidos esperándote.',
      aiAssistant: 'Asistente IA',
      aiAssistantDesc: 'Sugerencias y organización inteligente.',
      greeting: 'Hola, {name}',
    },
    createAlbum: {
      title: 'Crear Nuevo Álbum Familiar',
      subtitle: 'Comienza a tejer una nueva historia compartida',
      formTitle: 'Título del Álbum',
      formTitlePlaceholder: 'Ej: El huerto del abuelo, Viaje a Roma 2026...',
      formDesc: 'Descripción o Introducción',
      formDescPlaceholder: 'Describe brevemente qué recuerdos o épocas reunirá este álbum...',
      formDate: 'Fecha o Época de Inicio',
      formLocation: 'Ubicación / Origen',
      formLocationPlaceholder: 'Ej: Madrid, España / El pueblo',
      formCover: 'Imagen de Portada (Enlace)',
      formCoverPlaceholder: 'Enlace a una imagen en internet...',
      formCompanions: 'Acompañantes / Familiares (separados por comas)',
      formCompanionsPlaceholder: 'Ej: Mamá, Papá, Abuelo, Carlos...',
      formCategory: 'Categoría',
      createBtn: 'Crear Álbum Familiar',
      creatingBtn: 'Creando...',
      cancelBtn: 'Cancelar',
      copyright: '© 2026 AnMemoryNest. Tus recuerdos, construidos entre todos.',
    },
    albumDetail: {
      backBtn: 'Volver al inicio',
      companions: 'Compartido con:',
      location: 'Ubicación:',
      addMemory: 'Añadir Foto',
      memoriesTab: 'Recuerdos ({count})',
      aiChatTab: 'Preguntar al Asistente IA',
      heritageTab: 'Cápsula Digital ({count})',
      emptyMemories: 'No hay fotos o recuerdos guardados',
      emptyMemoriesDesc: 'Haz clic en "Añadir foto" para agregar el primer recuerdo a este álbum.',
      newChapterBtn: 'Crear Nuevo Capítulo',
      companionsActive: 'Integrantes Activos',
      companionsTyping: 'escribiendo...',
      chatPlaceholder: 'Pregunta al asistente sobre este álbum o pídele que redacte una historia...',
      chatSend: 'Enviar',
      chatVoiceHint: 'Presiona para grabar audio',
      chatVoiceRecording: 'Grabando... suelta para enviar',
    },
    legacy: {
      title: 'Legado Digital y Albacea',
      subtitle: 'Planifica y resguarda la posteridad de tus recuerdos y activos digitales.',
      intro: 'Tus recuerdos son el tesoro más grande para las futuras generaciones. Configura quién y cómo podrá acceder a ellos en el futuro.',
      setupTitle: 'Asignar un Albacea Digital',
      setupDesc: 'Elige un familiar de confianza que pueda custodiar, descargar o continuar construyendo tu legado familiar.',
      formName: 'Nombre del Albacea',
      formNamePlaceholder: 'Ej: Carlos Ruiz García',
      formEmail: 'Correo Electrónico',
      formEmailPlaceholder: 'carlos@familia.com',
      formAccess: 'Tipo de Acceso',
      accessRead: 'Solo lectura (Descargar recuerdos)',
      accessWrite: 'Co-propietario (Gestionar y añadir recuerdos)',
      formCondition: 'Condición de Activación',
      condInactivity: 'Tras 6 meses de inactividad de mi cuenta',
      condImmediate: 'Acceso inmediato como co-administrador',
      condLegacy: 'Bajo solicitud manual certificada',
      saveBtn: 'Guardar Configuración del Legado',
      savingBtn: 'Guardando...',
      successMsg: 'Configuración de albacea digital guardada con éxito',
      cardTitle: 'Tu Albacea Configurado',
      statusActive: 'Activo / Pendiente de verificación',
      statusVerified: 'Verificado',
      btnChange: 'Cambiar Albacea',
      btnRevoke: 'Revocar Acceso',
    },
    settings: {
      title: 'Ajustes',
      subtitle: 'Configura tu perfil, privacidad y preferencias de inteligencia artificial.',
      sidebarProfile: 'Perfil General',
      sidebarAi: 'Asistente IA',
      sidebarSecurity: 'Privacidad y Seguridad',
      sidebarImages: 'Enlaces de Imágenes',
      profileTitle: 'Información de Perfil',
      profileAvatarLabel: 'Enlace de Foto de Perfil',
      profileNameLabel: 'Nombre para mostrar',
      profileEmailLabel: 'Correo electrónico',
      profileEmailHint: 'El correo electrónico principal no se puede modificar directamente.',
      profileSuccess: 'Perfil actualizado correctamente',
      saveBtn: 'Guardar Cambios',
      aiTitle: 'Preferencias del Asistente IA',
      aiDesc: 'Administra cómo interactúa la inteligencia artificial con tus fotografías familiares y relatos.',
      aiToggleOrganize: 'Activar Organizador Inteligente',
      aiToggleOrganizeDesc: 'Permitir que la IA analice las fotos para sugerir títulos, fechas e historias.',
      aiToggleFaces: 'Auto-detección de rostros frecuentes',
      aiToggleFacesDesc: 'Identificar automáticamente familiares en común a través de tus recuerdos.',
      aiScanTitle: 'Escanear Recuerdos',
      aiScanDesc: 'Haz un escaneo manual en todo tu baúl de recuerdos para descubrir rostros perdidos, proponer mejoras cronológicas o limpiar fotos borrosas.',
      aiScanBtn: 'Escanear fotos ahora',
      aiScanning: 'Escaneando...',
      aiScanningMeta: 'Escaneando metadatos de imágenes...',
      aiScanningFaces: 'Analizando rostros frecuentes...',
      aiScanComplete: '✓ Escaneo completado. Se han actualizado las sugerencias del asistente.',
      aiConsoleTitle: 'Consola Central del Asistente',
      aiConsoleDesc: 'Aquí se concentran todas las sugerencias de la IA detectadas en todos tus álbumes familiares.',
      securityTitle: 'Privacidad y Seguridad',
      securityDesc: 'MemoryNest está diseñado para proteger tu privacidad. Tus datos y rostros nunca serán compartidos ni utilizados para entrenar modelos públicos.',
      securityEncryptTitle: 'Cifrado de Extremo a Extremo',
      securityEncryptDesc: 'Todas las imágenes y audios se almacenan con cifrado avanzado en el almacenamiento persistente de Google Cloud.',
      securityDeleteTitle: 'Eliminación Permanente',
      securityDeleteDesc: 'Si decides borrar una foto, recuerdo o álbum, los archivos e información se borrarán de forma definitiva de nuestros servidores de inmediato.',
      imagesTitle: 'Galería de Enlaces del Proyecto',
      imagesDesc: 'Consulta, copia y gestiona todos los enlaces de imágenes de MemoryNest. Puedes ver las fotos dinámicas de tus álbumes o el catálogo estático definido a nivel de código.',
      imagesSubTabCode: 'Catálogo en Código (Estáticos)',
      imagesSubTabActive: 'Imágenes Activas (Álbumes)',
      imagesCodeHint: 'Este listado proviene directamente de la constante estática IMAGE_CATALOGUE definida en el archivo /src/lib/images.ts. Es ideal para referenciar avatares, fotos por defecto y portadas de muestra.',
      imagesEmpty: 'Sin imágenes guardadas',
      imagesEmptyDesc: 'Agrega recuerdos o define fotos de portada para ver sus enlaces aquí.',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      langSelect: 'Idioma de la aplicación / Language',
      langSelectDesc: 'Elige tu idioma de preferencia (Español o Inglés).',
      sidebarOpenSource: 'Código Abierto & Render',
      openSourceTitle: 'Licencia Libre e Integración con Render',
      openSourceDesc: 'AnMemoryNest es 100% libre y de código abierto. Creemos que las familias merecen ser dueñas absolutas de sus recuerdos, sin ataduras corporativas ni formatos cerrados.',
      openSourceLicenseTitle: 'Licencia MIT',
      openSourceLicenseDesc: 'El código fuente está disponible públicamente y licenciado bajo la Licencia MIT. Esto te otorga permiso completo para utilizar, copiar, modificar y distribuir esta aplicación de forma gratuita.',
      openSourceRenderTitle: 'Desplegar en Render con un Clic',
      openSourceRenderDesc: 'Render te permite alojar esta aplicación y su base de datos Node.js de forma rápida y gratuita. Hemos incluido un archivo render.yaml preconfigurado.',
      openSourceDeployBtn: 'Desplegar en Render',
    },
    newMemory: {
      title: 'Añadir Nuevo Recuerdo',
      subtitle: 'Añade una foto a este álbum y describe la historia que hay detrás.',
      urlLabel: 'Enlace de la Imagen',
      urlPlaceholder: 'https://ejemplo.com/foto.jpg',
      captionLabel: 'Historia o Leyenda',
      captionPlaceholder: 'Ej: Ese día sopló el viento más fuerte del verano...',
      addBtn: 'Añadir al Álbum',
      addingBtn: 'Añadiendo...',
      cancelBtn: 'Cancelar',
    },
    auth: {
      loginTitle: 'Inicia sesión en AnMemoryNest',
      loginSubtitle: 'Accede a tus recuerdos familiares compartidos',
      registerTitle: 'Crea tu cuenta familiar',
      registerSubtitle: 'Comienza a salvaguardar vuestra historia común',
      emailLabel: 'Correo electrónico',
      passwordLabel: 'Contraseña',
      nameLabel: 'Nombre completo',
      loginBtn: 'Iniciar Sesión',
      registerBtn: 'Registrarse',
      haveAccount: '¿Ya tienes una cuenta?',
      needAccount: '¿No tienes una cuenta?',
      orDemo: 'O explora la aplicación con:',
      demoBtn: 'Iniciar Sesión de Demostración',
      loggingIn: 'Iniciando sesión...',
      signingUp: 'Registrando...',
    }
  },
  en: {
    nav: {
      home: 'Home',
      legacy: 'Digital Legacy',
      notifications: 'Notifications',
      markAllRead: 'Mark all as read',
      profile: 'My Profile & Legacy',
      settings: 'Settings',
      logout: 'Log Out',
    },
    landing: {
      title: 'Don\'t just save photos.',
      titleItalic: 'Preserve the stories',
      titleSuffix: ' behind them.',
      description: 'The first intelligent time capsule designed to capture the voice, emotions, and tales that make every family memory unique.',
      startBtn: 'Get Started',
      christmasCaption: 'Christmas Dinner, 1988',
      interrailCaption: 'Interrail 2026',
    },
    dashboard: {
      title: 'Your Memory Chest',
      subtitle: 'Preserve and relive your family history',
      searchPlaceholder: 'Search memories or albums...',
      allCategories: 'All Categories',
      categoryTravel: 'Travel',
      categoryFamily: 'Family',
      categoryHeritage: 'Heritage / History',
      categoryFriends: 'Friends',
      categoryColleagues: 'Colleagues',
      allCompanions: 'All Companions',
      noAlbums: 'No memories found',
      noAlbumsDesc: 'Create a new album or adjust your search filters.',
      addMemoryBtn: 'Add Memory',
      addMemoryDesc: 'You have shared memories waiting for you.',
      aiAssistant: 'AI Assistant',
      aiAssistantDesc: 'Suggestions and smart organization.',
      greeting: 'Hello, {name}',
    },
    createAlbum: {
      title: 'Create New Family Album',
      subtitle: 'Begin weaving a new shared story',
      formTitle: 'Album Title',
      formTitlePlaceholder: 'e.g., Grandpa\'s Garden, Rome Trip 2026...',
      formDesc: 'Description or Introduction',
      formDescPlaceholder: 'Briefly describe what memories or eras this album will gather...',
      formDate: 'Start Date or Era',
      formLocation: 'Location / Origin',
      formLocationPlaceholder: 'e.g., Madrid, Spain / The village',
      formCover: 'Cover Image (URL)',
      formCoverPlaceholder: 'URL to an image on the internet...',
      formCompanions: 'Companions / Family Members (separated by commas)',
      formCompanionsPlaceholder: 'e.g., Mom, Dad, Grandpa, Carlos...',
      formCategory: 'Category',
      createBtn: 'Create Family Album',
      creatingBtn: 'Creating...',
      cancelBtn: 'Cancel',
      copyright: '© 2026 AnMemoryNest. Your memories, built together.',
    },
    albumDetail: {
      backBtn: 'Back to home',
      companions: 'Shared with:',
      location: 'Location:',
      addMemory: 'Add Photo',
      memoriesTab: 'Memories ({count})',
      aiChatTab: 'Ask AI Assistant',
      heritageTab: 'Digital Capsule ({count})',
      emptyMemories: 'No photos or memories saved',
      emptyMemoriesDesc: 'Click "Add photo" to add the first memory to this album.',
      newChapterBtn: 'Create New Chapter',
      companionsActive: 'Active Members',
      companionsTyping: 'typing...',
      chatPlaceholder: 'Ask the assistant about this album or ask it to write a story...',
      chatSend: 'Send',
      chatVoiceHint: 'Press to record audio',
      chatVoiceRecording: 'Recording... release to send',
    },
    legacy: {
      title: 'Digital Legacy & Executor',
      subtitle: 'Plan and secure the posterity of your digital assets and memories.',
      intro: 'Your memories are the greatest treasure for future generations. Configure who and how they will be accessed in the future.',
      setupTitle: 'Assign a Digital Executor',
      setupDesc: 'Choose a trusted family member who can safeguard, download, or continue building your family legacy.',
      formName: 'Executor Name',
      formNamePlaceholder: 'e.g., Carlos Ruiz Garcia',
      formEmail: 'Email Address',
      formEmailPlaceholder: 'carlos@family.com',
      formAccess: 'Access Type',
      accessRead: 'Read-only (Download memories)',
      accessWrite: 'Co-owner (Manage and add memories)',
      formCondition: 'Activation Condition',
      condInactivity: 'After 6 months of account inactivity',
      condImmediate: 'Immediate access as co-administrator',
      condLegacy: 'Upon certified manual request',
      saveBtn: 'Save Legacy Configuration',
      savingBtn: 'Saving...',
      successMsg: 'Digital executor configuration saved successfully',
      cardTitle: 'Your Configured Executor',
      statusActive: 'Active / Pending verification',
      statusVerified: 'Verified',
      btnChange: 'Change Executor',
      btnRevoke: 'Revoke Access',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Configure your profile, privacy, and artificial intelligence preferences.',
      sidebarProfile: 'General Profile',
      sidebarAi: 'AI Assistant',
      sidebarSecurity: 'Privacy & Security',
      sidebarImages: 'Image Links',
      profileTitle: 'Profile Information',
      profileAvatarLabel: 'Profile Photo URL',
      profileNameLabel: 'Display Name',
      profileEmailLabel: 'Email Address',
      profileEmailHint: 'The primary email address cannot be modified directly.',
      profileSuccess: 'Profile updated successfully',
      saveBtn: 'Save Changes',
      aiTitle: 'AI Assistant Preferences',
      aiDesc: 'Manage how artificial intelligence interacts with your family photos and stories.',
      aiToggleOrganize: 'Activate Smart Organizer',
      aiToggleOrganizeDesc: 'Allow the AI to analyze photos to suggest titles, dates, and stories.',
      aiToggleFaces: 'Auto-detection of frequent faces',
      aiToggleFacesDesc: 'Automatically identify common relatives across your memories.',
      aiScanTitle: 'Scan Memories',
      aiScanDesc: 'Perform a manual scan across your entire memory chest to discover lost faces, propose chronological improvements, or clean up blurry photos.',
      aiScanBtn: 'Scan photos now',
      aiScanning: 'Scanning...',
      aiScanningMeta: 'Scanning image metadata...',
      aiScanningFaces: 'Analyzing frequent faces...',
      aiScanComplete: '✓ Scan completed. Assistant suggestions have been updated.',
      aiConsoleTitle: 'Central Assistant Console',
      aiConsoleDesc: 'All AI suggestions detected across all your family albums are consolidated here.',
      securityTitle: 'Privacy & Security',
      securityDesc: 'MemoryNest is designed to protect your privacy. Your data and faces will never be shared or used to train public models.',
      securityEncryptTitle: 'End-to-End Encryption',
      securityEncryptDesc: 'All images and audios are stored with advanced encryption in Google Cloud secure storage.',
      securityDeleteTitle: 'Permanent Deletion',
      securityDeleteDesc: 'If you decide to delete a photo, memory, or album, files and information will be permanently deleted from our servers immediately.',
      imagesTitle: 'Project Image Links Gallery',
      imagesDesc: 'Consult, copy, and manage all image links of MemoryNest. You can see the dynamic photos of your albums or the static catalogue defined at code level.',
      imagesSubTabCode: 'Catalog in Code (Static)',
      imagesSubTabActive: 'Active Images (Albums)',
      imagesCodeHint: 'This list comes directly from the IMAGE_CATALOGUE static constant defined in /src/lib/images.ts. It is ideal for referencing avatars, default photos, and sample covers.',
      imagesEmpty: 'No saved images',
      imagesEmptyDesc: 'Add memories or define cover photos to see their links here.',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      langSelect: 'Application Language / Idioma',
      langSelectDesc: 'Choose your language preference (Spanish or English).',
      sidebarOpenSource: 'Open Source & Render',
      openSourceTitle: 'Free License & Render Integration',
      openSourceDesc: 'AnMemoryNest is 100% free and open-source. We believe families deserve absolute ownership of their memories, without corporate lock-in or closed formats.',
      openSourceLicenseTitle: 'MIT License',
      openSourceLicenseDesc: 'The source code is publicly available and licensed under the MIT License. This grants you full permission to use, copy, modify, and distribute this application for free.',
      openSourceRenderTitle: 'One-Click Deploy on Render',
      openSourceRenderDesc: 'Render allows you to host this Node.js app and its database quickly and for free. We have included a preconfigured render.yaml file.',
      openSourceDeployBtn: 'Deploy to Render',
    },
    newMemory: {
      title: 'Add New Memory',
      subtitle: 'Add a photo to this album and describe the story behind it.',
      urlLabel: 'Image URL',
      urlPlaceholder: 'https://example.com/photo.jpg',
      captionLabel: 'Story or Caption',
      captionPlaceholder: 'e.g., That day the strongest wind of the summer blew...',
      addBtn: 'Add to Album',
      addingBtn: 'Adding...',
      cancelBtn: 'Cancel',
    },
    auth: {
      loginTitle: 'Sign in to AnMemoryNest',
      loginSubtitle: 'Access your shared family memories',
      registerTitle: 'Create your family account',
      registerSubtitle: 'Start safeguarding your common history',
      emailLabel: 'Email address',
      passwordLabel: 'Password',
      nameLabel: 'Full name',
      loginBtn: 'Log In',
      registerBtn: 'Register',
      haveAccount: 'Already have an account?',
      needAccount: 'Don\'t have an account?',
      orDemo: 'Or explore the app with:',
      demoBtn: 'Log In to Demo Session',
      loggingIn: 'Signing in...',
      signingUp: 'Registering...',
    }
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('memorynest_lang');
    if (saved === 'es' || saved === 'en') return saved;
    // Auto-detect browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('memorynest_lang', lang);
  };

  const t = (path: string, replacements?: Record<string, string | number>) => {
    const parts = path.split('.');
    let current: any = translations[language];
    
    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        // Fallback to Spanish if not found in English
        let fallback: any = translations['es'];
        for (const fPart of parts) {
          if (fallback && fallback[fPart] !== undefined) {
            fallback = fallback[fPart];
          } else {
            fallback = null;
            break;
          }
        }
        if (typeof fallback === 'string') {
          current = fallback;
          break;
        }
        return path;
      }
    }
    
    if (typeof current !== 'string') return path;
    
    let result = current;
    if (replacements) {
      Object.entries(replacements).forEach(([key, value]) => {
        result = result.replace(new RegExp(`{${key}}`, 'g'), String(value));
      });
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
