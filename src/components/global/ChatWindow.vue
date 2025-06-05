<script setup lang="ts">
import ChatBubble from "@/components/global/ChatBubble.vue";
import SendIcon from "@/assets/icons/SendIcon.vue";
import { useChatStore } from "@/stores/chat";
import router from "@/router";

const chatStore = useChatStore();

function redirectToAnalysis() {
  if (chatStore.promptJuez.trim() === "") {
    alert("Por favor, ingresa un prompt para el análisis.");
    return;
  }
  router.push('/analysis/chat')
}
</script>

<template>
  <div class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg flex flex-col gap-4">
    <div class="flex flex-col gap-2 grow overflow-y-auto px-4 pt-4">
      <ChatBubble v-for="message in chatStore.messages" :key="message.id" :message="message" />
    </div>
    <div class="mx-4 mb-4 relative flex">
      <textarea type="text" :placeholder="chatStore.modelIsTyping ? 'Respondiendo... ' : 'Pregunta lo que quieras'"
        v-model="chatStore.userInput" :disabled="chatStore.modelIsTyping"
        @keydown.enter.exact.prevent="chatStore.addUserMessage()"
        @keydown.enter.shift.exact.prevent="chatStore.userInput += '\n'"
        class="w-full py-4 pl-4 pr-14 rounded-2xl shadow-lg bg-theme-lightgray dark:bg-theme-steelblue resize-none"></textarea>
      <button @click="chatStore.addUserMessage()" :disabled="!chatStore.userInput.trim()" class="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-2xl shadow-lg bg-theme-seablue text-white cursor-pointer 
          hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed">
        <SendIcon color="#FFFFFF" class="size-6" />
      </button>
      <button @click="chatStore.clearMessages()" class="absolute top-1/2 right-16 -translate-y-1/2 p-2 rounded-2xl 
        bg-white text-black border-1 border-black dark:bg-theme-moon dark:border-slate-400 dark:text-white cursor-pointer 
          hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!chatStore.messages.length">
        <img
          src="@/assets/icons/CleanIcon.svg"
          alt="clean icon"
          class="size-5 dark:hidden"
        />
        <img
          src="@/assets/icons/CleanIconWhite.svg"
          alt="clean icon"
          class="size-5 hidden dark:block"
        />
      </button>
      <button @click="redirectToAnalysis()" class="absolute top-1/2 right-28 -translate-y-1/2 p-2 rounded-2xl 
        bg-white text-black border-1 border-black dark:bg-theme-moon dark:border-slate-400 dark:text-white cursor-pointer 
          hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!chatStore.messages.length">
        Analizar modelo
    </button>
    </div>
  </div>
</template>

<style scoped></style>