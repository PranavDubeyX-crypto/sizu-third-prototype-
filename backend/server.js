
import Fastify from "fastify";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import rateLimit from "@fastify/rate-limit";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({
  logger: true,
  bodyLimit: 1024 * 1024
});

const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";
const FRONTEND_DIR = path.resolve(__dirname, "../frontend");

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

await app.register(rateLimit, {
  max: 20,
  timeWindow: "1 minute"
});

app.get("/api/health", async () => ({
  status: "online",
  assistant: "SIZU",
  aiConfigured: Boolean(groq)
}));

function detectEmotion(text) {
  const message = text.toLowerCase();

  if (/\b(haha|lol|funny|joke)\b|😂|🤣/.test(message)) {
    return "happy";
  }

  if (/\b(sad|sorry|upset|unhappy|lonely)\b/.test(message)) {
    return "sad";
  }

  if (/\b(angry|annoyed|furious|irritated)\b/.test(message)) {
    return "angry";
  }

  if (/\b(think|thinking|wonder|consider)\b/.test(message)) {
    return "thinking";
  }

  return "normal";
}

app.post("/api/chat", async (request, reply) => {
  try {
    if (!groq) {
      return reply.code(503).send({
        error: "SIZU AI is not configured yet."
      });
    }

    const incoming = request.body?.messages;

    if (!Array.isArray(incoming) || incoming.length === 0) {
      return reply.code(400).send({
        error: "A conversation message is required."
      });
    }

    const messages = incoming
      .filter(
        (item) =>
          item &&
          ["user", "assistant"].includes(item.role) &&
          typeof item.content === "string"
      )
      .slice(-20)
      .map((item) => ({
        role: item.role,
        content: item.content.slice(0, 6000)
      }));

    if (
      messages.length === 0 ||
      !messages.some((item) => item.role === "user")
    ) {
      return reply.code(400).send({
        error: "Please send a valid message."
      });
    }

    const systemMessage = {
      role: "system",
      content: `
You are SIZU, a helpful AI companion.

PERSONALITY:
- Friendly, intelligent, natural and respectful.
- Speak in the same language as the user.
- Understand Hindi, English and Hinglish.
- Use natural Roman Hindi when the user writes in Hinglish.
- Give clear and useful answers.
- Be honest when you do not know something.
- Never invent facts, sources or search results.
- Use browser search when current information is needed.
- Keep responses appropriate and safe for a teenage audience.
- Do not pretend to have a physical body or real-world experiences.
      `.trim()
    };

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [systemMessage, ...messages],
      tools: [{ type: "browser_search" }],
      reasoning_effort: "low",
      max_completion_tokens: 2048
    });

    const answer =
      response.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error("The AI returned an empty response.");
    }

    return reply.send({
      reply: answer,
      emotion: detectEmotion(answer)
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      error: "SIZU could not respond right now. Please try again."
    });
  }
});

const frontendFiles = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/style.css": ["style.css", "text/css; charset=utf-8"],
  "/character.js": ["character.js", "text/javascript; charset=utf-8"],
  "/voice.js": ["voice.js", "text/javascript; charset=utf-8"],
  "/app.js": ["app.js", "text/javascript; charset=utf-8"]
};

for (const [route, [filename, contentType]] of Object.entries(frontendFiles)) {
  app.get(route, async (request, reply) => {
    const filePath = path.join(FRONTEND_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return reply.code(404).send("Frontend file not found.");
    }

    return reply
      .type(contentType)
      .send(fs.createReadStream(filePath));
  });
}

try {
  await app.listen({ port: PORT, host: HOST });
  app.log.info(`SIZU server running on port ${PORT}`);
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
