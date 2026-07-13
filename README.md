<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# AnMemoryNest - Cápsula del Tiempo Inteligente y Familiar

AnMemoryNest es una plataforma de código abierto diseñada para ayudar a las familias a capturar, organizar y preservar sus recuerdos colectivos. Combina galerías de fotos colaborativas, relatos familiares escritos y notas de voz con un Asistente de Memoria inteligente impulsado por la API de Gemini.

## 🚀 Desplegar en Render (One-Click Deploy)

Puedes desplegar tu propia instancia de AnMemoryNest en la nube utilizando **Render** con un solo clic. Haz clic en el botón de abajo para comenzar:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

El archivo `render.yaml` incluido configurará automáticamente el servicio web con la configuración de compilación y ejecución correcta. Asegúrate de configurar la variable de entorno `GEMINI_API_KEY` en el panel de Render para habilitar las características del Asistente IA.

## 💻 Ejecución Local

**Requisitos:** Node.js (versión 18 o superior)

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
2. Configura tu clave API de Gemini en un archivo `.env` en la raíz del proyecto:
   ```env
   GEMINI_API_KEY=tu_clave_api_aquí
   ```
3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

El servidor se ejecutará localmente en `http://localhost:3000`.

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Es un software 100% libre y de código abierto. Consulta el archivo [LICENSE](LICENSE) para más detalles.

