import { InferenceClient } from "@huggingface/inference";
import { HF_TOKEN } from "./env";

const HuggingFaceModels = [
  { id: "mistralai/Mistral-7B-Instruct-v0.3", name: "Mistral" },
  { id: "meta-llama/Llama-3.1-8B-Instruct", name: "Llama 3.1" },
  { id: "Qwen/Qwen3-235B-A22B", name: "Qwen 3" },
  { id: "google/gemma-3-27b-it", name: "Gemma 3" },
];

class HuggingFaceService {
  static async queryLLM(input: string, model: string) {
    try {
      const client = new InferenceClient(HF_TOKEN);

      const chatCompletion = await client.chatCompletion({
        provider: "hf-inference",
        model: model,
        messages: [
          {
            role: "user",
            content:
              "Analyze the sentiment of the following text and classify it into one of the following categories: 'Positive', 'Negative', or 'Neutral'. Your answer should be only one word. Do not include any additional text or explanation. Here is the text: " +
              input,
          },
        ],
      });

      let response = chatCompletion.choices[0].message.content ?? "";

      return response;
    } catch (error) {
      console.error("Error querying LLM:", error);
      return "ERROR: Mis disculpas, se ha producido un error, no puedo procesar tu solicitud en este momento.";
    }
  }
}

export { HuggingFaceService, HuggingFaceModels };
