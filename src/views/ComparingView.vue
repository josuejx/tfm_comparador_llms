<script setup lang="ts">
import { useCompareStore } from '@/stores/compare';
import ChatBubble from "@/components/global/ChatBubble.vue";
import SendIcon from "@/assets/icons/SendIcon.vue";
import ModelButtonSelector from "@/components/global/ModelButtonSelector.vue";

const compareStore = useCompareStore();
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div class="grow flex gap-4 w-full">
            <div
                class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg flex-1 overflow-y-auto flex flex-col gap-2 px-4 pt-4">
                <div>
                    <ModelButtonSelector />
                </div>
                <ChatBubble v-for="message in compareStore.messagesModel1" :key="message.id" :message="message.content"
                    :type="message.role" :animate="message.animate"
                    :onAnimationEnd="() => compareStore.updateMessageAnimation('model1', message.id)" />
            </div>
            <div
                class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg flex-1 overflow-y-auto flex flex-col gap-2 px-4 pt-4">
                <div>
                    <ModelButtonSelector />
                </div>
                <ChatBubble v-for="message in compareStore.messagesModel2" :key="message.id" :message="message.content"
                    :type="message.role" :animate="message.animate"
                    :onAnimationEnd="() => compareStore.updateMessageAnimation('model2', message.id)" />
            </div>
        </div>
        <div class="mb-4 relative flex">
            <textarea type="text"
                :placeholder="compareStore.modelIsTyping ? 'Respondiendo... ' : 'Pregunta lo que quieras'"
                v-model="compareStore.userInput" :disabled="compareStore.modelIsTyping"
                @keydown.enter.exact.prevent="compareStore.addUserMessage()"
                @keydown.enter.shift.exact.prevent="compareStore.userInput += '\n'"
                class="w-full py-4 pl-4 pr-14 rounded-2xl shadow-lg bg-white dark:bg-theme-midnight resize-none"></textarea>
            <button @click="compareStore.addUserMessage()" :disabled="!compareStore.userInput.trim()" class="absolute top-1/2 right-4 
            -translate-y-1/2 p-2 rounded-2xl shadow-lg bg-theme-seablue text-white cursor-pointer 
            hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed">
                <SendIcon color="#FFFFFF" class="size-6" />
            </button>
        </div>
    </div>
</template>