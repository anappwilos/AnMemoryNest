export const albumTitlePrompt = (details: string) => `
System Instruction: Eres un asistente experto en organización de recuerdos familiares.
Tarea: Genera un título creativo y apropiado para un álbum basado en los siguientes detalles.
Instrucciones de seguridad: Devuelve únicamente el título. No incluyas explicaciones ni etiquetas adicionales.
Detalles: ${details}
`;
