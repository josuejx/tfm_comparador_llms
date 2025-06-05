<script setup lang="ts">
defineProps<{ text: string; }>();
</script>

<template>
  <p class="typewritter-effect">{{ text }}</p>
</template>

<style scoped>
.typewritter-effect {
  animation: typewritter 2s steps(40, end) forwards;
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
