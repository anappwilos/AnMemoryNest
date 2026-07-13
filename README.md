# AnMemoryNest - Smart Family Time Capsule

AnMemoryNest is an open-source platform designed to help families capture, organize, and preserve their collective memories. It combines collaborative photo galleries, written family stories, and voice memos with a smart Memory Assistant powered by the Gemini API.

## 🚀 Deploy to Render (One-Click Deploy)

You can deploy your own AnMemoryNest instance to the cloud using **Render** with just one click. Click the button below to get started:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

The included `render.yaml` file will automatically configure the web service with the correct build and run settings. Make sure to set the `GEMINI_API_KEY` environment variable in the Render panel to enable the AI ​​Assistant features.

## 💻 Local Run

**Requirements:** Node.js (version 18 or higher)

1. Install project dependencies:

``bash

npm install

``
2. Set your Gemini API key in a `.env` file in the project root:

``env

GEMINI_API_KEY=your_api_key_here

``
3. Start the local development server:

``bash

npm run dev

``

The server will run locally at `http://localhost:3000`.

## 📄 License

This project is licensed under the **MIT License**. It is 100% free and open-source software. See the [LICENSE](LICENSE) file for more details.
