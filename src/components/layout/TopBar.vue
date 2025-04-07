<script setup lang="ts">
import DarkModeToggler from '@/components/global/DarkModeToggler.vue';
import { isDarkMode } from '@/utils/utils';
</script>

<template>
  <div class="w-full bg-white dark:bg-theme-midnight p-4 flex justify-between items-center">
    <div class="flex items-center gap-2">
      <img src="@/assets/EvaLLM.svg" alt="EvaLLM" class="w-8 h-8" v-if="!isDarkMode" />
      <img src="@/assets/EvaLLM_white.svg" alt="EvaLLM" class="w-8 h-8" v-else />
      <h1 class="text-2xl font-bold text-theme-steelblue dark:text-white">Comparador LLMs</h1>
    </div>
    <DarkModeToggler />
  </div>
</template>
