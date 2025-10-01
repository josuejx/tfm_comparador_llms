import { InferenceClient } from "@huggingface/inference";
import { HF_TOKEN } from "./env";

const HuggingFaceModels = [
  // { id: "mistralai/Mistral-7B-Instruct-v0.3", provider: 'hf-inference', name: "Mistral" },
  { id: "meta-llama/Llama-3.1-8B-Instruct", provider: 'fireworks-ai', name: "Llama 3.1" },
  { id: "Qwen/Qwen3-235B-A22B", provider: 'fireworks-ai', name: "Qwen 3" },
  { id: "google/gemma-3-27b-it", provider: 'nebius', name: "Gemma 3" },
  { id: "deepseek-ai/DeepSeek-V3.2-Exp", provider: 'novita', name: "DeepSeek V3.2" },
];

class HuggingFaceService {
  static async queryLLM(input: string, model: string, promptSystem: string = "") {
    try {
      console.log("HF_TOKEN:", HF_TOKEN);
      const client = new InferenceClient(HF_TOKEN);
      const modelProvider = HuggingFaceModels.find(m => m.id === model)?.provider || 'hf-inference';

      const chatCompletion = await client.chatCompletion({
        provider: modelProvider as any,
        model: model,
        messages: [
          {
            role: "system",
            content: promptSystem,
          },
          {
            role: "user",
            content: input
          },
        ],
      });

      console.log("Chat completion response:", chatCompletion);
      let response = chatCompletion.choices[0].message.content ?? "";

      return response;
    } catch (error) {
      console.error("Error querying LLM:", error);
      return "ERROR: Mis disculpas, se ha producido un error, no puedo procesar tu solicitud en este momento.";
    }
  }
}

export { HuggingFaceService, HuggingFaceModels };
