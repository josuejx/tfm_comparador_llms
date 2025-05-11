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
          ...messages.map((message) => {
            return {
              role: message.role,
              content: message.content,
            };
          }),
          {
            role: "user",
            content:
              "Please compare the results of the analysis made by the model and provide a summary of the differences.",
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

  static async analyzeMultipleModels(messagesModel1: Message[], messagesModel2: Message[]) {
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
            content:
              "You are a helpful assistant that compares the results of two models and provides a summary of the differences. First Model: ",
          },
          ...messagesModel1.map((message) => {
            return {
              role: message.role,
              content: message.content,
            };
          }),
          {
            role: "system",
            content:
              "Second Model: ",
          },
          ...messagesModel2.map((message) => {
            return {
              role: message.role,
              content: message.content,
            };
          }),
          {
            role: "user",
            content:
              "Please compare the results of the analysis made by the two models and provide a summary of the differences.",
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
