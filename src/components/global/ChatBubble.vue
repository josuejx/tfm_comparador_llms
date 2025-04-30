<script setup lang="ts">
const props = defineProps<{ message: string; type: "USER" | "MODEL", animate: boolean, onAnimationEnd: () => void }>();

const animationEnd = (_: AnimationEvent) => props.onAnimationEnd();
</script>

<template>
  <div class="relative rounded-2xl shadow-lg p-2 w-fit"
    :class="{ 
      'rounded-br-none self-end bg-theme-seablue text-white': type === 'USER', 
      'rounded-bl-none bg-theme-lightgray dark:bg-theme-steelblue': type === 'MODEL' 
    }">
    <p class="whitespace-pre-line" :class="{ 'typewritter-effect': type === 'MODEL' && animate }" @animationend="animationEnd">{{ message }}</p>
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
