<script setup lang="ts">
import TopBar from "@/components/layout/TopBar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen max-h-screen dark:text-white">
    <TopBar />
    <div class="grow flex p-4 gap-4 overflow-y-auto overflow-x-hidden">
      <RouterView />
    </div>
  </div>
</template>