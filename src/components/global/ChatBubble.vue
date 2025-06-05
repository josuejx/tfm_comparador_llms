<script setup lang="ts">
import type Message from '@/types/message';
import moment from 'moment';
import { computed } from 'vue';

const props = defineProps<{ message: Message }>();

const animationEnd = (_: AnimationEvent) => props.message.animate = false;

const isErrorMessage = computed(() => {
  return props.message.role === 'MODEL' && props.message.content.startsWith('ERROR:');
});
</script>

<template>
  <div class="relative rounded-2xl shadow-lg p-2 w-fit max-w-[70%] transition-all duration-300 ease-in-out" :class="{
    'rounded-br-none self-end bg-theme-seablue text-white': message.role === 'USER',
    'rounded-bl-none bg-theme-lightgray dark:bg-theme-steelblue': message.role === 'MODEL' && !isErrorMessage,
    'rounded-bl-none bg-theme-lightgray dark:bg-theme-steelblue text-red': message.role === 'MODEL' && isErrorMessage
  }">
    <p class="whitespace-pre-line" :class="{ 'typewritter-effect': message.role === 'MODEL' && message.animate }"
      @animationend="animationEnd">{{ message.content }}</p>
    <div class="flex items-center text-xs mt-2" :class="{
      'text-gray-200 justify-end': message.role === 'USER',
      'text-gray-500 dark:text-gray-300': message.role === 'MODEL'
    }">
      <p>{{ moment(message.timestamp).format('HH:mm') }}</p>
    </div>
  </div>
</template>

<style scoped>
.typewritter-effect {
  animation: typewritter 1s steps(40, end) forwards;
}

@keyframes typewritter {
  from {
    clip-path: inset(0 100% 0 0);
  }

  to {
    clip-path: inset(0 0 0 0);
  }
}
</style>
