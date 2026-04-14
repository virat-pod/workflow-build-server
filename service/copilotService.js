import Groq from "groq-sdk";
import pkg from "@copilotkit/runtime";
const { CopilotRuntime, GroqAdapter, copilotRuntimeNodeHttpEndpoint } = pkg;

const groq = new Groq({
  apiKey: process.env.GROQ_API_SECRET,
});

const serviceAdapter = new GroqAdapter({
  groq,
  model: "llama-3.3-70b-versatile",
});

const runtime = new CopilotRuntime({
  actions: [],
});

const handler = copilotRuntimeNodeHttpEndpoint({
  endpoint: "/copilot",
  runtime,
  serviceAdapter,
});

export default handler;
