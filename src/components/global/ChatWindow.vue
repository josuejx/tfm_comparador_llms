<script setup lang="ts">
import ChatBubble from "@/components/global/ChatBubble.vue";
import SendIcon from "@/assets/icons/SendIcon.vue";
</script>

<template>
  <div class="bg-white dark:bg-theme-midnight rounded-2xl shadow-lg flex flex-col gap-4">
    <div class="flex flex-col gap-2 grow overflow-y-auto px-4 pt-4">
      <ChatBubble message="Hola, ¿en qué puedo ayudarte?" type="MODEL" />
      <ChatBubble message="Quiero que me ayudes con un proyecto" type="USER" />
      <ChatBubble message="¡Por supuesto!" type="MODEL" />
    </div>
    <div class="mx-4 mb-4 relative flex">
      <textarea type="text" placeholder="Pregunta lo que quieras"
        class="w-full py-4 pl-4 pr-14 rounded-2xl shadow-lg bg-theme-lightgray dark:bg-theme-steelblue resize-none"></textarea>
      <button
        class="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-2xl shadow-lg bg-theme-seablue text-white cursor-pointer  hover:scale-105 active:scale-95 transition">
        <SendIcon color="#FFFFFF" class="size-6" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>