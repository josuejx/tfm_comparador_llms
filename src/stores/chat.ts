import { defineStore } from "pinia";
import type Message from "@/types/message";
import { HuggingFaceService, HuggingFaceModels } from "@/services/huggingface.services";

export const useChatStore = defineStore("chat", {
	state: () => ({
		userInput: "",
		modelIsTyping: false,
		selectedModel: HuggingFaceModels[0].id,
		messages: [] as Message[],
	}),
	getters: {},
	actions: {
		async addUserMessage() {
			if (!this.userInput.trim()) return;
			const newMessage: Message = {
				id: this.messages.length + 1,
				content: this.userInput.trim(),
				role: "USER",
				timestamp: new Date().toISOString(),
				animate: false,
			};
			this.messages.push(newMessage);
			this.userInput = "";

			this.modelIsTyping = true;
			let response = await HuggingFaceService.queryLLM(newMessage.content, this.selectedModel);
			this.modelIsTyping = false;
			this.addModelMessage(response, "MODEL");
		},
		addModelMessage(content: string, role: "USER" | "MODEL") {
			const newMessage: Message = {
				id: this.messages.length + 1,
				content,
				role,
				timestamp: new Date().toISOString(),
				animate: true,
				model: HuggingFaceModels.find((model) => model.id === this.selectedModel)?.name,
			};
			this.messages.push(newMessage);
		},
		clearMessages() {
			this.messages = [];
		},
	},
});
