import type Message from "@/types/message";
import { OPENAI_API_KEY } from "./env";

export class OpenAIService {
  static async analyzeModelResults(messages: Message[], promptJuez: string) {
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
            content: promptJuez,
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
    messagesModel2: Message[],
    promptJuez: string
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
            content: promptJuez,
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
          }))
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
