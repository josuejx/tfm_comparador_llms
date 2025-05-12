import { defineStore } from "pinia";
import type Message from "@/types/message";
import { HuggingFaceService, HuggingFaceModels } from "@/services/huggingface.services";
import { OpenAIService } from '@/services/openai.services';

export const useCompareStore = defineStore("compare", {
    state: () => ({
        userInput: "",
        modelIsTyping: false,
        selectedModel1: HuggingFaceModels[0].id,
        selectedModel2: HuggingFaceModels[1].id,
        messagesModel1: [] as Message[],
        messagesModel2: [] as Message[],
    }),
    getters: {},
    actions: {
        async addUserMessage() {
            if (!this.userInput.trim()) return;
            this.addModelMessage("model1", this.userInput, "USER");
            this.addModelMessage("model2", this.userInput, "USER");
            this.userInput = "";

            this.modelIsTyping = true;
            let responseModel1 = await HuggingFaceService.queryLLM(this.userInput, this.selectedModel1);
            let responseModel2 = await HuggingFaceService.queryLLM(this.userInput, this.selectedModel2);
            this.modelIsTyping = false;
            this.addModelMessage("model1", responseModel1, "MODEL");
            this.addModelMessage("model2", responseModel2, "MODEL");
        },
        addModelMessage(model: "model1" | "model2", content: string, role: "USER" | "MODEL") {
            if (model === "model1") {
                const newMessage: Message = {
                    id: this.messagesModel1.length + 1,
                    content,
                    role,
                    timestamp: new Date().toISOString(),
                    animate: role === "MODEL" ? true : false,
                };
                this.messagesModel1.push(newMessage);
            } else {
                const newMessage: Message = {
                    id: this.messagesModel2.length + 1,
                    content,
                    role,
                    timestamp: new Date().toISOString(),
                    animate: role === "MODEL" ? true : false,
                };
                this.messagesModel2.push(newMessage);
            }
        },
        updateMessageAnimation(model: "model1" | "model2", id: number) {
            if (model === "model1") {
                this.messagesModel1.find((message) => message.id === id)!.animate = false;
            } else {
                this.messagesModel2.find((message) => message.id === id)!.animate = false;
            }
        },
        clearMessages() {
            this.messagesModel1 = [];
            this.messagesModel2 = [];
        },
        async analysisResults() {
			return await OpenAIService.analyzeMultipleModels(this.messagesModel1, this.messagesModel2);
		}
    },
});
