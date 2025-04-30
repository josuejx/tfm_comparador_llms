import { defineStore } from "pinia";
import type Message from "@/types/message";

export const useCompareStore = defineStore("compare", {
    state: () => ({
        userInput: "",
        modelIsTyping: false,
        messagesModel1: [] as Message[],
        messagesModel2: [] as Message[],
    }),
    getters: {},
    actions: {
        addUserMessage() {
            if (!this.userInput.trim()) return;
            this.addModelMessage("model1", this.userInput, "USER");
            this.addModelMessage("model2", this.userInput, "USER");
            this.userInput = "";

            this.modelIsTyping = true;
            setTimeout(() => {
                this.modelIsTyping = false;
                this.addModelMessage("model1", "Respuesta del modelo 1", "MODEL");
                this.addModelMessage("model2", "Respuesta del modelo 2", "MODEL");
            }, 5000);
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
    },
});
