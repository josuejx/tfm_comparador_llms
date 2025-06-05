<script setup lang="ts">
import TopBar from "@/components/layout/TopBar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen max-h-screen dark:text-white">
    <TopBar class="animate-slide-in-top" />
    <div id="router-content" class="grow flex p-4 gap-4 overflow-y-auto overflow-x-hidden animate-zoom-in">
      <RouterView />
    </div>
  </div>
</template>