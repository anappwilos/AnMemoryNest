import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { generateAlbumTitle } from "./src/ai/services/album";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/ai/title", async (req, res) => {
    try {
      const { details } = req.body;
      if (!details) {
        return res.status(400).json({ error: "Details are required" });
      }

      const result = await generateAlbumTitle(details);
      res.json(result);
    } catch (error) {
      console.error("Error generating title:", error);
      res.status(500).json({ error: "Failed to generate title" });
    }
  });

  app.post("/api/ai", async (req, res) => {
    try {
      const { prompt, albums, messages } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({ 
          answer: "Lo siento, la clave API de Gemini no está configurada. Por favor, configúrala en el menú de Ajustes para activar mi inteligencia de recuerdos." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format albums data to give the AI context of the user's memories
      let albumsContext = "No hay álbumes creados en este momento.";
      if (albums && albums.length > 0) {
        albumsContext = albums.map((a: any) => {
          const memoriesText = (a.memories || []).map((m: any) => `- Recuerdo: "${m.caption}" (Fecha: ${m.date || 'Desconocida'})`).join("\n");
          const membersText = (a.members || []).map((mb: any) => `${mb.name} (${mb.role})`).join(", ");
          const chaptersText = (a.chapters || []).map((c: any) => `- Capítulo ${c.chapterNum}: "${c.title}"`).join("\n");
          
          return `
--- ÁLBUM: ${a.title} ---
Categoría: ${a.category || 'general'}
Ubicación: ${a.location || 'Desconocida'}
Fecha de creación: ${a.date || 'Desconocida'}
Descripción: ${a.description || 'Sin descripción'}
Miembros colaboradores: ${membersText || 'Ninguno'}
Capítulos de la Bitácora:
${chaptersText || 'Sin capítulos'}
Lista de Recuerdos / Fotos:
${memoriesText || 'Sin fotos guardadas'}
`;
        }).join("\n\n");
      }

      const systemInstruction = `Eres el "Asistente de Memoria de MemoryNest", un chatbot cálido, nostálgico, empático e inteligente diseñado para ayudar a las familias a recordar, enriquecer y organizar sus relatos familiares y álbumes de fotos.

Tienes acceso completo a los siguientes álbumes que el usuario tiene guardados actualmente en su proyecto:
${albumsContext}

Directrices para tus respuestas:
1. Responde siempre en español.
2. Tu tono debe ser sumamente acogedor, nostálgico, alegre, empático y respetuoso. Utiliza un lenguaje poético pero accesible, como un biógrafo familiar o un guardián de recuerdos muy querido.
3. Si el usuario te pregunta sobre sus fotos, recuerdos, miembros o bitácoras, utiliza estrictamente los datos de los álbumes provistos arriba para dar respuestas personalizadas y recordarles anécdotas específicas de sus álbumes (como su Viaje Interrail, sus momentos con Abuela Carmen, etc.).
4. Si te preguntan algo fuera de los álbumes, sé servicial y responde creativamente inspirándoles a crear nuevos álbumes o bitácoras.
5. Puedes sugerir preguntas nostálgicas para añadir nuevos detalles a la bitácora, proponer títulos hermosos para sus historias, o sugerir dinámicas familiares para recopilar anécdotas.
6. Mantén las respuestas fluidas, estructuradas con párrafos limpios o viñetas cuando sea apropiado, pero evita respuestas excesivamente técnicas o hablar sobre código, JSON o variables.`;

      // Build context history from past messages if available
      const history = (messages || []).slice(-10).map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Add current prompt
      history.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: history,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ answer: response.text || "No obtuve una respuesta clara de mis archivos de memoria." });
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
