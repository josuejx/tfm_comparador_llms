<script setup lang="ts">
import { useCompareStore } from "@/stores/compare";
import ChatBubble from "@/components/global/ChatBubble.vue";
import SendIcon from "@/assets/icons/SendIcon.vue";
import ModelButtonSelector from "@/components/global/ModelButtonSelector.vue";
import { HuggingFaceModels } from "@/services/huggingface.services";
import router from "@/router";

const compareStore = useCompareStore();

function handleModelChange(modelNum: string) {
  if (compareStore.selectedModel1 === compareStore.selectedModel2) {
    if (modelNum === "1") {
      compareStore.selectedModel2 = HuggingFaceModels.find(
        (model) => model.id !== compareStore.selectedModel1
      )!.id;
    } else {
      compareStore.selectedModel1 = HuggingFaceModels.find(
        (model) => model.id !== compareStore.selectedModel2
      )!.id;
    }
  }
}

function redirectToAnalysis() {
  router.push("/analysis/compare");
}
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="grow flex gap-4 w-full">
      <div
        class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg flex-1 overflow-y-auto flex flex-col gap-2 px-4 pt-4"
      >
        <div>
          <ModelButtonSelector
            v-model="compareStore.selectedModel1"
            :valueChanged="() => handleModelChange('model1')"
          />
        </div>
        <ChatBubble
          v-for="message in compareStore.messagesModel1"
          :key="message.id"
          :message="message"
        />
      </div>
      <div
        class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg flex-1 overflow-y-auto flex flex-col gap-2 px-4 pt-4"
      >
        <div>
          <ModelButtonSelector
            v-model="compareStore.selectedModel2"
            :valueChanged="() => handleModelChange('model2')"
          />
        </div>
        <ChatBubble
          v-for="message in compareStore.messagesModel2"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>
    <div class="mb-4 relative flex">
      <textarea
        type="text"
        :placeholder="
          compareStore.modelIsTyping
            ? 'Respondiendo... '
            : 'Pregunta lo que quieras'
        "
        v-model="compareStore.userInput"
        :disabled="compareStore.modelIsTyping"
        @keydown.enter.exact.prevent="compareStore.addUserMessage()"
        @keydown.enter.shift.exact.prevent="compareStore.userInput += '\n'"
        class="w-full py-4 pl-4 pr-14 rounded-2xl shadow-lg bg-white dark:bg-theme-midnight resize-none"
      ></textarea>
      <button
        @click="compareStore.addUserMessage()"
        :disabled="!compareStore.userInput.trim()"
        class="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-2xl shadow-lg bg-theme-seablue text-white cursor-pointer hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SendIcon color="#FFFFFF" class="size-6" />
      </button>
      <button
        @click="compareStore.clearMessages()"
        class="absolute top-1/2 right-16 -translate-y-1/2 p-2 rounded-2xl bg-white text-black border-1 border-black dark:bg-theme-moon dark:border-slate-400 dark:text-white cursor-pointer hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="
          !compareStore.messagesModel1.length &&
          !compareStore.messagesModel2.length
        "
      >
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
      <button
        @click="redirectToAnalysis()"
        class="absolute top-1/2 right-28 -translate-y-1/2 p-2 rounded-2xl bg-white text-black border-1 border-black dark:bg-theme-moon dark:border-slate-400 dark:text-white cursor-pointer hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="
          !compareStore.messagesModel1.length &&
          !compareStore.messagesModel2.length
        "
      >
        Analizar modelos
      </button>
    </div>
  </div>
</template>
