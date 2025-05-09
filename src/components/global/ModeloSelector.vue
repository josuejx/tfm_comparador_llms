<script setup lang="ts">
import { ref } from "vue";
import { HuggingFaceModels } from "@/services/huggingface.services";
import { useChatStore } from "@/stores/chat";

const chatStore = useChatStore();

const setSelectedModel = (modelId: string) => {
  if (chatStore.selectedModel === modelId) {
    return;
  }
  if (chatStore.messages.length > 0) {
    const confirmChange = confirm(
      "¿Estás seguro de que quieres cambiar el modelo? Esto borrará el historial de la conversación."
    );
    if (!confirmChange) return;
    chatStore.clearMessages();
  }

  chatStore.modelIsTyping = false;
  chatStore.userInput = "";
  chatStore.selectedModel = modelId;
};
</script>

<template>
  <div class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg min-w-sm flex flex-col">
    <h2 class="text-lg p-4">Listado de Modelos</h2>
    <div class="grow flex flex-col gap-2 bg-theme-lightgray dark:bg-theme-midnight p-4 rounded-b-2xl">
      <div class="flex items-center gap-2 p-4 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition"
        v-for="model in HuggingFaceModels" :key="model.id" @click="setSelectedModel(model.id)" :class="{
          'bg-theme-seablue dark:bg-theme-seablue text-white':
            model.id === chatStore.selectedModel,
          'bg-white dark:bg-theme-steelblue': model.id !== chatStore.selectedModel,
        }">
        <p>{{ model.name }}</p>
      </div>
    </div>
  </div>
</template>
