<script setup lang="ts">
defineProps<{ message: string; type: "USER" | "MODEL" }>();
</script>

<template>
  <div class="relative rounded-2xl shadow-lg p-2 w-fit"
    :class="{ 
      'rounded-br-none self-end bg-theme-seablue text-white': type === 'USER', 
      'rounded-bl-none bg-theme-lightgray dark:bg-theme-steelblue': type === 'MODEL' 
    }">
    <p class="whitespace-pre-line">{{ message }}</p>
  </div>
</template>
