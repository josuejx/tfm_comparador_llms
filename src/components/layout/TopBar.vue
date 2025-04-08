<script setup lang="ts">
import DarkModeToggler from '@/components/global/DarkModeToggler.vue';
import { isDarkMode } from '@/utils/utils';
</script>

<template>
  <div class="w-full bg-white dark:bg-theme-midnight p-4 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <img src="@/assets/EvaLLM.svg" alt="EvaLLM" class="w-8 h-8" v-if="!isDarkMode" />
      <img src="@/assets/EvaLLM_white.svg" alt="EvaLLM" class="w-8 h-8" v-else />
      <RouterLink to="/" class="flex flex-col">
        <h1 class="text-2xl font-bold text-theme-steelblue dark:text-white">EvaLLM</h1>
        <p class="text-gray-500 dark:text-gray-300 text-[10px]">Comparador de LLMs</p>
      </RouterLink>
      <nav class="flex items-center ml-8 gap-2">
        <RouterLink to="/" class="text-theme-steelblue dark:text-white">Chat</RouterLink>
      </nav>
    </div>
    <DarkModeToggler />
  </div>
</template>
