<script setup lang="ts">

defineProps<{ message: string, type: 'USER' | 'MODEL' }>();
</script>

<template>
  <div class="relative rounded-2xl shadow-lg p-4 w-fit"
    :class="{ 
      'rounded-br-none self-end bg-theme-seablue dark:bg-theme-steelblue text-white': type === 'USER', 
      'rounded-bl-none bg-theme-lightgray dark:bg-theme-midnight': type === 'MODEL' 
    }">
    <p>{{ message }}</p>
  </div>
</template>
