import { defineStore } from "pinia";
import type Message from "@/types/message";

export const useChatStore = defineStore("chat", {
	state: () => ({
		userInput: "",
		modelIsTyping: false,
		messages: [] as Message[],
	}),
	getters: {},
	actions: {
		addUserMessage() {
			if (!this.userInput.trim()) return;
			const newMessage: Message = {
				id: this.messages.length + 1,
				content: this.userInput,
				role: "USER",
				timestamp: new Date().toISOString(),
			};
			this.messages.push(newMessage);
			this.userInput = "";
		},
	},
});
