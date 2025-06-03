import type Message from "@/types/message";
import { OPENAI_API_KEY } from "./env";

export class OpenAIService {
  static async analyzeModelResults(messages: Message[]) {
    // Send the messages to the OpenAI API, and get a comparision of the results of the analysis made by the model
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Eres un modelo de lenguaje que actúa como juez para comparar el análisis de sentimientos realizado por un modelo de IA.
        Tu tarea es:
        1. Leer los análisis del modelo sobre un texto.
        2. Evaluar sus respuestas en cuanto a precisión, claridad, coherencia y profundidad.
        3. Asignar al modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
        4. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
        5. Por último, proporciona un resumen textual de tu evaluación sobre el análisis realizado por el modelo.`,
          },
          ...messages.map((message) => {
            return {
              role: message.role === "USER" ? "user" : "assistant",
              content: message.content,
            };
          }),
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from OpenAI API: " + response.statusText);
    }

    const data = await response.json();
    const { choices } = data;
    if (choices && choices.length > 0) {
      return choices[0].message.content;
    } else {
      throw new Error("No choices found in the response");
    }
  }
  
  static async analyzeMultipleModelResults(
    messagesModel1: Message[],
    messagesModel2: Message[]
  ) {
    // Send the messages to the OpenAI API, and get a comparision of the results of the analysis made by the model
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Eres un modelo de lenguaje que actúa como juez para comparar el análisis de sentimientos realizado por dos modelos diferentes de IA.
        Tu tarea es:
        1. Leer los análisis de ambos modelos sobre un mismo texto.
        2. Comparar sus respuestas en cuanto a precisión, claridad, coherencia y profundidad.
        3. Indicar cuál crees que es más acertado y por qué.
        4. Asignar a cada modelo una puntuación del 1 al 5 en cada uno de los siguientes criterios: precisión, claridad, coherencia, profundidad.
        5. Devuelve también los resultados en una tabla sencilla o como datos estructurados para graficar si es posible.
        6. Por último, proporciona un resumen textual de tu evaluación sobre el análisis realizado por ambos modelos.`,
          },
          {
            role: "user",
            content: `Texto original analizado: [Aquí puedes insertar el texto si lo tienes disponible]`,
          },
          {
            role: "user",
            content: `Respuesta del Modelo 1:`,
          },
          ...messagesModel1.map((message) => ({
            role: message.role === "USER" ? "user" : "assistant",
            content: message.content,
          })),
          {
            role: "user",
            content: `Respuesta del Modelo 2:`,
          },
          ...messagesModel2.map((message) => ({
            role: message.role === "USER" ? "user" : "assistant",
            content: message.content,
          })),
          {
            role: "user",
            content: `Por favor, compara los resultados siguiendo los puntos anteriores. Devuelve también un resumen textual y una tabla con las puntuaciones por modelo.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from OpenAI API");
    }

    const data = await response.json();
    const { choices } = data;
    if (choices && choices.length > 0) {
      return choices[0].message.content;
    } else {
      throw new Error("No choices found in the response");
    }
  }
}
