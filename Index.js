import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));

const OPENAI_KEY = process.env.OPENAI_API_KEY;

function buildPrompt(data) {
  return `Logo für "${data.brand}". Branche: ${data.industry}. Stil: ${data.style}. Farben: ${data.colors}. Icon/Shape: ${data.shape}. Minimalistisch, klar, flache Farben, Vektor-Stil, transparent Hintergrund, 1:1, keine Schatten, keine Fotorealistik.`;
}

app.post("/generate", async (req, res) => {
  try {
    const prompt = buildPrompt(req.body);

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024",
        n: 4
      })
    });

    const json = await response.json();
    res.json(json);
  } catch (e) {
    res.status(500).json({ error: "Fehler beim Generieren" });
  }
});

app.listen(3000, () => {
  console.log("Deine Logo-AI läuft! Öffne den Web-Tab oben.");
});
