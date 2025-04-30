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
				animate: false,
			};
			this.messages.push(newMessage);
			this.userInput = "";

			this.modelIsTyping = true;
			setTimeout(() => {
				this.modelIsTyping = false;
				this.addModelMessage("Respuesta del modelo 1", "MODEL");
			}, 5000);
		},
		addModelMessage(content: string, role: "USER" | "MODEL") {
			const newMessage: Message = {
				id: this.messages.length + 1,
				content,
				role,
				timestamp: new Date().toISOString(),
				animate: true,
			};
			this.messages.push(newMessage);
		},
		updateMessageAnimation(id: number) {
			this.messages.find((message) => message.id === id)!.animate = false;
		},
	},
});
